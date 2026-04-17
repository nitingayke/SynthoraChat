import { Filter } from "lucide-react";
import { useState } from "react"
import QuestionFilterDropdown from "./QuestionFilterDropdown";

export default function QuestionFilterToggle() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className='z-50 absolute top-18 right-0 sm:right-6 h-8 w-10 sm:w-8 flex justify-center items-center rounded-s-full border border-e-0 border-gray-300/50 dark:border-gray-600/50 sm:rounded-full bg-white/90 dark:bg-[#161616]/90 backdrop-blur-sm shadow-sm hover:bg-orange-500 dark:hover:bg-[#07C5B9] hover:shadow-lg hover:shadow-[#07C5B9]/25 transition-all duration-300 group'>
                <Filter className='h-4! w-4! text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors duration-300' />
            </button>
            <QuestionFilterDropdown isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
        </>
    )
}