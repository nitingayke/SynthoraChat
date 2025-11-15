import { useContext, useEffect } from "react";
import ChatSidebar from "../../components/main/aiChat/ChatSidebar";
import ChatWindow from "../../components/main/aiChat/ChatWindow";
import AIChatContext from "../../context/AIChatContext";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";


export default function AIChat() {

    const { threadId } = useParams();
    const { setSelectedChat } = useContext(AIChatContext);
    const { loginUser } = useContext(AuthContext);

    useEffect(() => {
        if (!loginUser?.aiInteractions || !threadId) return;

        const foundChat = loginUser.aiInteractions.find((chat) => chat?._id === threadId);
        if(foundChat) {
            setSelectedChat(foundChat);
        } else {
            setSelectedChat(null);
        }
    }, [loginUser, threadId, setSelectedChat]);

    return (
        <section className="w-full max-w-6xl gap-2 md:gap-4 h-full mx-auto flex bg-gray">
            <ChatSidebar />
            <ChatWindow />
        </section>
    )
}