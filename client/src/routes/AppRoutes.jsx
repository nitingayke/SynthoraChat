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
import MainPage from "../pages/chatPages/MainPage";

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

                <Route path="/main" element={<MainLayout />} >
                    <Route index element={<MainPage />} />
                    <Route path="ai-chat" element={<h1>ai chat</h1>} />
                    <Route path="explore" element={<h1>explore</h1>} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="*" element={<Navigate to="/home" replace />} />

            </Routes>

            <GlobalOverlay />
        </>
    )
}