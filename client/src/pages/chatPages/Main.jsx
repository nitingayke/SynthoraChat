import { useContext } from "react";
import QuestionList from "../../components/main/questionsList/QuestionList";
import UserProfile from "../../components/main/user/UserProfile";
import AuthContext from "../../context/AuthContext";
import GuestProfile from "../../components/main/user/GuestProfile";

export default function Main() {

    const { loginUser } = useContext(AuthContext);

    return (
        <div className="w-full max-w-5xl mx-auto flex py-4 gap-4">
            <div className="hidden md:block w-70 md:w-[35%]">
                {loginUser ? <UserProfile /> : <GuestProfile />}
            </div>

            <div className="flex-1">
                <QuestionList />
            </div>
        </div>
    )
}