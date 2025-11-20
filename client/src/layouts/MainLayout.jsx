import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/main/Navbar";
import { useEffect, useRef } from "react";

export default function MainLayout() {

    const location = useLocation();
    const scrollRef = useRef(null);

    useEffect(() => {

        if ((location.pathname === "/main/explore" && location.search.includes("query"))) {
            return;
        }

        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0 });
        }
    }, [location.pathname, location.search, location.hash]);

    return (
        <div ref={scrollRef} className="h-screen overflow-y-auto overflow-x-hidden flex flex-col transition-colors duration-500 ease-in-out bg-gradient-to-b bg-gray-100 
        dark:bg-[#0f0f0f]
        text-gray-900 dark:text-gray-100 scroll-smooth">
            <Navbar />

            <main className="flex-1 flex flex-col px-3 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out">
                <Outlet />
            </main>
        </div>
    )
}