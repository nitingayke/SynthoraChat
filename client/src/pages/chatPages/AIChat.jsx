import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { X, Brain, ChevronRight } from "lucide-react";
import Drawer from "@mui/material/Drawer";

import ChatSidebar from "../../components/main/aiChat/ChatSidebar";
import ChatWindow from "../../components/main/aiChat/ChatWindow";
import AIChatContext from "../../context/AIChatContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { fetchSingleChat } from "../../services/ai.service";

import { useSnackbar } from "notistack";


export default function AIChat() {

    const { threadId } = useParams();
    const { selectedChat, setSelectedChat } = useContext(AIChatContext);
    const { enqueueSnackbar } = useSnackbar();

    useDocumentTitle(selectedChat?.title || "AI Chat");

    const [loading, setLoading] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        const loadChat = async () => {
            if (!threadId) {
                setSelectedChat(null);
                return;
            }

            try {
                setLoading(true);

                const res = await fetchSingleChat(threadId);
                const chat = res?.data?.chat;

                setSelectedChat(chat);
            } catch {
                enqueueSnackbar("Failed to load chat", { variant: "error" });
                setSelectedChat(null);
            } finally {
                setLoading(false);
            }
        }

        loadChat();
    }, [enqueueSnackbar, setSelectedChat, threadId]);

    return (
        <>
            <section className="w-full max-w-6xl gap-2 h-full mx-auto flex bg-gray px-2">
                <button
                    className="md:hidden absolute top-16 left-2 z-40 bg-white dark:bg-[#1f1f1f] p-2 rounded-md shadow"
                    onClick={() => setOpenDrawer(true)}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                <aside className="hidden md:flex h-[calc(100vh-65px)] flex-col w-72 bg-white dark:bg-[#161616] p-3">
                    <ChatSidebar />
                </aside>
                <ChatWindow loading={loading} />
            </section>

            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                className="md:hidden"
            >
                <div className="w-70 h-full bg-white dark:bg-[#161616] flex flex-col">
                    <div className="flex items-center justify-between p-4 shadow dark:text-white">
                        <div className="flex items-center gap-2">
                            <Brain className="text-orange-500 dark:text-[#07C5B9] w-5 h-5" />
                            <span className="text-lg font-bold">
                                SynthoraChat
                            </span>
                        </div>

                        <button onClick={() => setOpenDrawer(false)}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto flex flex-col p-3">
                        <ChatSidebar />
                    </div>
                </div>
            </Drawer>
        </>
    )
}