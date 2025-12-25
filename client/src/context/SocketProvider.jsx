import { useEffect, useMemo } from "react"
import SocketContext from "./SocketContext"
import { connectSocket, disconnectSocket, getSocket } from "../socket/socket";
import { useSnackbar } from "notistack";

export const SocketProvider = ({ children }) => {

    const socket = getSocket();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        connectSocket();

        socket.on("error", (payload) => {
            enqueueSnackbar(payload?.message || "Something went wrong", {
                variant: "error",
            });
        });

        return () => {
            socket.off();
            disconnectSocket();
        }
    }, [enqueueSnackbar, socket]);

    const values = useMemo(() => ({
        socket
    }), [socket]);

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    )
}