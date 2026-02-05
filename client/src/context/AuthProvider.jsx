import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "./AuthContext";
import SocketContext from "./SocketContext";
import { fetchActiveUsers } from "../services/analytics.service";
import { fetchCurrentUser } from "../services/user.service";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import ThemeContext from "./ThemeContext";

export const AuthProvider = ({ children }) => {

    const { socket } = useContext(SocketContext);
    const { theme } = useContext(ThemeContext);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [loginUser, setLoginUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [presenceMap, setPresenceMap] = useState({});

    const logout = useCallback(() => {
        if (socket) {
            socket.emit("user:offline");
        }
        localStorage.removeItem("token");
        setLoginUser(null);
    }, [socket]);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setAuthLoading(false);
                return;
            }

            try {
                const res = await fetchCurrentUser();
                const user = res?.data?.user || null;
                setLoginUser(user);
            } catch (err) {
                // Only logout on auth-related errors
                const status = err?.response?.status;
                if (status === 401 || status === 403) {
                    enqueueSnackbar("Session expired. Please login again.", {
                        variant: "warning",
                    });
                    logout();
                }
            } finally {
                setAuthLoading(false);
            }
        }

        const handleFetchActiveUsers = async () => {

            try {
                const res = await fetchActiveUsers();
                if (res.success) {
                    const map = {};
                    res.data.users.forEach(u => {
                        map[u.userId] = {
                            online: u.online,
                            lastSeen: u.lastSeen
                        };
                    });

                    setPresenceMap(map);
                }
            } catch {
                console.error("Failed to fetch active users");
            }
        }

        initAuth();
        handleFetchActiveUsers();
    }, [logout, enqueueSnackbar]);

    useEffect(() => {
        if (!socket) return;

        if (loginUser?._id) {
            socket.emit("user:online", { userId: loginUser._id });
        } else {
            socket.emit("user:offline");
        }
    }, [loginUser, socket]);

    useEffect(() => {
        if (!socket) return;

        const handleUnload = () => {
            socket.emit("user:offline");
        }

        window.addEventListener("beforeunload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, [socket]);

    const handlePresence = ({ userId, online, lastSeen }) => {
        setPresenceMap(prev => ({
            ...prev,
            [userId]: {
                online,
                lastSeen: lastSeen ?? prev[userId]?.lastSeen ?? null
            }
        }));
    };

    const handleNewNotification = useCallback((notification) => {

        enqueueSnackbar((notification.description || notification.title), {
            variant: "info",

            action: notification.link
                ? (key) => (
                    <button
                        onClick={() => {
                            navigate(notification.link);
                            closeSnackbar(key);
                        }}
                        style={{
                            cursor: "pointer",
                            fontWeight: 500,
                            textDecoration: "underline",
                            color: theme === "light" ? "#f54a00" : "#07C5B9",
                            backgroundColor: "transparent",
                            border: "none",
                            padding: 0,
                        }}
                    >
                        View
                    </button>
                )
                : undefined,

            style: {
                backgroundColor: theme === "dark" ? "#252525" : "#ffffff",
                color: theme === "light" ? "#252525" : "#ffffff",
            },
        });

        setLoginUser(prev => ({
            ...prev,
            notifications: [...(prev?.notifications || []), notification],
        }));

    }, [enqueueSnackbar, navigate, theme, closeSnackbar]);

    useEffect(() => {
        if (!socket) return;

        socket.on("user:presence", handlePresence);
        socket.on("notification:new", handleNewNotification);

        return () => {
            socket.off("user:presence", handlePresence);
            socket.off("notification:new", handleNewNotification);
        }
    }, [socket, handleNewNotification]);

    const values = useMemo(() => ({
        loginUser,
        setLoginUser,
        logout,
        authLoading,
        presenceMap,
        isOnline: (userId) => presenceMap[userId]?.online ?? false,
        lastSeen: (userId) => presenceMap[userId]?.lastSeen ?? null,
    }), [loginUser, authLoading, logout, presenceMap]);

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}