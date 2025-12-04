import { ArrowLeft } from "lucide-react";
import LoginComponent from "../components/common/LoginComponent";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white dark:bg-[#191919] transition-colors px-4">

      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 p-2 rounded-full border border-gray-300 dark:border-[#333] hover:bg-gray-100 dark:hover:bg-[#222] transition"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-white" />
      </button>

      <LoginComponent />
    </div>
  );
}
