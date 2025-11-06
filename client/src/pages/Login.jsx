import { ArrowLeft } from "lucide-react";
import LoginComponent from "../components/common/LoginComponent";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  return (
    <div className="bg-[url(src/assets/authbg.png)] h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat">
      <div className="relative flex justify-center items-center h-full py-10 px-4 backdrop-blur overflow-auto">

        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 sm:top-10 left-5 sm:left-10 lg:left-20 p-2 bg-white dark:bg-gray-800 rounded shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>

        <LoginComponent />
      </div>
    </div>
  );
}
