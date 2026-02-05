import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/main/Navbar";
import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

const noPaddingRoutes = [
    "/main/ai-chat",
];

export default function MainLayout() {

    const location = useLocation();
    const scrollRef = useRef(null);

    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {

        if ((location.pathname === "/main/explore" && location.search.includes("query"))) {
            return;
        }

        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0 });
        }
    }, [location.pathname, location.search, location.hash]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            setShowScrollTop(el.scrollTop > 300); // show after 300px
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        scrollRef.current?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const isNoPaddingRoute = noPaddingRoutes.some((route) =>
        location.pathname.startsWith(route)
    );


    return (
        <div ref={scrollRef} className="h-screen overflow-y-auto overflow-x-hidden flex flex-col transition-colors duration-500 ease-in-out bg-gradient-to-b bg-gray-100 dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100 scroll-smooth">
            <Navbar />

            <main className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${isNoPaddingRoute ? "px-0" : "px-3 sm:px-6 lg:px-8"}`}>
                <Outlet />
            </main>

            {
                showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-2 right-2 sm:bottom-6 sm:right-6 z-50 p-2 rounded-full bg-orange-500 text-white dark:bg-[#07C5B9] shadow-lg hover:opacity-90 transition-all duration-300"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={20} />
                    </button>
                )
            }
        </div>
    )
}