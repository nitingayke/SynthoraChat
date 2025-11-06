import { Outlet } from "react-router-dom";
import Navbar from "../components/main/Navbar";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col transition-colors duration-500 ease-in-out bg-gradient-to-b from-white/90 via-gray-50 to-gray-100 
        dark:from-[#0f0f0f] dark:via-[#121212] dark:to-[#161616]
        text-gray-900 dark:text-gray-100">
            <Navbar />

            <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out">
                <Outlet />
            </main>
        </div>
    )
}