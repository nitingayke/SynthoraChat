import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../layouts/layout";
import Landing from "../pages/Landing";
import Signup from "../pages/SignUp";
import Login from "../pages/login";
import Home from "../pages/home";
import Features from "../pages/Features";
import Community from "../pages/Community";
import GlobalOverlay from "../components/global/GlobalOverlay";
import Leaderboard from "../pages/Leaderboard";
import Contact from "../pages/Contact";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../components/common/NotFound";
import Main from "../pages/chatPages/Main";
import Explore from "../pages/chatPages/Explore";
import SettingsPage from "../pages/SettingsPage";
import CreatePostPage from "../pages/chatPages/CreatePostPage";
import { ProfilePage } from "../pages/ProfilePage";
import AIChat from "../pages/chatPages/AIChat";
import QuestionInteract from "../pages/chatPages/QuestionInteract";
import Temp from "../pages/chatPages/Temp";

export default function AppRoutes() {

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/" element={<Layout><Landing /></Layout>} />
                <Route path="/home" element={<Layout><Home /></Layout>} />
                <Route path="/features" element={<Layout><Features /></Layout>} />
                <Route path="/community" element={<Layout><Community /></Layout>} />
                <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/profile/:username" element={<Layout><ProfilePage /></Layout>} />

                <Route path="/main" element={<MainLayout />} >
                    <Route index element={<Main />} />
                    <Route path="questions/:questionId" element={<QuestionInteract />} />
                    <Route path="ai-chat/:threadId?" element={<AIChat />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="create-post" element={<CreatePostPage />} />
                    <Route path="temp" element={<Temp />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="*" element={<Navigate to="/home" replace />} />

            </Routes>

            <GlobalOverlay />
        </>
    )
}