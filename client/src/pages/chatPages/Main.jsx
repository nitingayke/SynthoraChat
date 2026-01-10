import { useContext } from "react";
import QuestionList from "../../components/main/questionsList/QuestionList";
import UserProfile from "../../components/main/user/UserProfile";
import AuthContext from "../../context/AuthContext";
import GuestProfile from "../../components/main/user/GuestProfile";
import QuestionContext from "../../context/QuestionContext";
import LoaderComponent from "../../components/loader/LoaderComponent"

export default function Main() {

    const { loginUser } = useContext(AuthContext);
    const { loadingQuestions } = useContext(QuestionContext);

    return (
        <div className="w-full max-w-5xl mx-auto flex py-4 gap-4">
            <div className="h-fit hidden md:block w-70 md:w-[35%] sticky bottom-4 self-start">
                {loginUser ? <UserProfile /> : <GuestProfile />}
            </div>

            <div className="flex-1">
                { loadingQuestions ? <div className="rounded-xl bg-white dark:bg-[#191919] p-6 border border-gray-200 dark:border-[#222222] flex items-center justify-center">
                    <LoaderComponent />
                </div> : <QuestionList /> }
            </div>
        </div>
    )
}