import { useContext } from "react";
import QuestionContext from "../../../context/QuestionContext";
import Drawer from "@mui/material/Drawer";
import { Link, useLocation } from "react-router-dom";
import { Check, SlidersHorizontal, Tags, X } from "lucide-react";

export default function QuestionFilterDropdown({ isOpen, setIsOpen }) {

    const { loadingTopics, filterOptions } = useContext(QuestionContext);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const activeFilter = searchParams.get("filter");
    const activeTopic = searchParams.get("topic");

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: "transparent",
                        boxShadow: 24,
                        borderRadius: 1,
                    },
                },
            }}
        >
            <div className="min-w-64 h-screen overflow-auto bg-white dark:bg-[#161616]">

                {/* HEADER */}
                <div className="px-4 py-2.5 bg-white dark:bg-[#161616] sticky top-0 right-0 flex items-center justify-between border-b border-gray-400/30">
                    <h2 className="font-bold text-lg text-orange-500 dark:text-[#07C5B9] flex items-center">
                        Filters
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-all"
                    >
                        <X size={20} className="text-gray-700 dark:text-gray-300" />
                    </button>
                </div>

                {/* FILTER LIST */}
                <div className="space-y-2 p-4">
                    {loadingTopics ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Loading filters...
                        </p>
                    ) : (
                        filterOptions.map((item) => {
                            const isActive =
                                (activeFilter && item.link === `filter=${activeFilter}`) ||
                                (activeTopic && item.link === `topic=${activeTopic}`);

                            const params = new URLSearchParams();

                            if (item.link.startsWith("filter")) {
                                params.set("filter", item.link.split("=")[1]);
                            }

                            if (item.link.startsWith("topic")) {
                                params.set("topic", item.link.split("=")[1]);
                            }

                            return (
                                <Link
                                    key={item.link}
                                    to={`/main?${params.toString()}`}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center justify-between p-2 px-3 text-sm rounded-lg transition-all
                                        ${isActive
                                            ? "bg-orange-100 text-orange-500 dark:bg-[#07C5B9]/20 dark:text-[#07C5B9] font-semibold"
                                            : "hover:bg-gray-100 dark:hover:bg-[#212121] dark:text-white"
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {item.link.startsWith("filter") && <SlidersHorizontal size={16} />}
                                        {item.link.startsWith("topic") && <Tags size={16} />}
                                        {item.label}
                                    </div>

                                    {isActive && (
                                        <Check size={16} className="text-orange-500 dark:text-[#07C5B9]" />
                                    )}
                                </Link>
                            );
                        })
                    )}

                </div>
            </div>
        </Drawer>
    );
}
