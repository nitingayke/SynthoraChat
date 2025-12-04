import { motion } from "framer-motion";
import { Camera, Edit3, Share2, Mail, CheckCircle } from "lucide-react";
import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Avatar from "@mui/material/Avatar";

const ProfileHeader = ({ onEdit }) => {
  const { loginUser } = useContext(AuthContext);

  return (
    <div
      className="
        bg-white dark:bg-[#191919]
        rounded-xl shadow-lg overflow-hidden
        border border-gray-200 dark:border-[#2e2e2e]
      "
    >
      {/* TOP BANNER */}
      <div className="relative h-48 w-full">
        {loginUser?.profile?.coverPicture ? (
          <img
            src={loginUser.profile.coverPicture}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#07C5B9] to-[#0EA5E9]" />
        )}

        {/* Verified Badge */}
        {loginUser?.isVerified && (
          <div
            className="
              absolute top-4 right-4 px-3 py-1.5 rounded-full
              bg-white/90 dark:bg-[#1b1b1b]/80 backdrop-blur-sm
              flex items-center gap-2
            "
          >
            <CheckCircle className="w-4 h-4 text-blue-500 dark:text-[#07C5B9]" />
            <span className="text-sm text-gray-700 dark:text-gray-200">
              Verified
            </span>
          </div>
        )}
      </div>

      {/* MAIN ROW SECTION */}
      <div className="flex flex-col sm:flex-row gap-6 px-6 py-6 relative">
        
        {/* LEFT: PROFILE PICTURE */}
        <div className="relative -mt-20 sm:-mt-16 h-fit">
          <div
            className="
              w-32 h-32 rounded-full
              border-4 border-white dark:border-[#191919]
              overflow-hidden shadow-lg bg-white dark:bg-[#202020]
            "
          >
            {loginUser?.profile?.profilePicture ? (
              <img
                src={loginUser.profile.profilePicture}
                className="w-full h-full object-cover"
                alt="profile"
              />
            ) : (
              <Avatar className="!w-full !h-full dark:!bg-[#272727]">
                {loginUser?.profile?.firstName?.[0] || "U"}
              </Avatar>
            )}
          </div>

          {/* Camera Icon */}
          <button
            className="
              absolute bottom-1 right-1 p-2 rounded-full
              bg-white dark:bg-[#2a2a2a]
              border border-gray-200 dark:border-gray-700
              shadow-md hover:bg-gray-50 dark:hover:bg-[#3a3a3a]
              text-gray-700 dark:text-gray-300 transition
            "
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* RIGHT: USER DETAILS + BUTTONS */}
        <div className="flex-1 mt-4 sm:mt-0">

          {/* NAME + USERNAME + EMAIL */}
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {loginUser?.profile?.firstName} {loginUser?.profile?.lastName}
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-lg">
              @{loginUser?.username}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {loginUser?.email}
            </p>
          </div>

          {/* BIO */}
          {loginUser?.profile?.bio && (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5 max-w-xl">
              {loginUser.profile.bio}
            </p>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onEdit}
              className="
                px-5 py-2.5 rounded-lg font-semibold shadow-md
                bg-orange-500 hover:bg-orange-600 text-white
                dark:bg-[#07C5B9] dark:hover:bg-[#05b0a7]
                flex items-center gap-2 transition
              "
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </motion.button>

            <button
              className="
                px-4 py-2.5 rounded-lg font-medium
                bg-gray-100 hover:bg-gray-200
                dark:bg-[#202020] dark:hover:bg-[#2a2a2a]
                border border-gray-200 dark:border-gray-700
                text-gray-700 dark:text-gray-300
                flex items-center gap-2 transition
              "
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>

            <button
              className="
                px-4 py-2.5 rounded-lg font-medium
                bg-gray-100 hover:bg-gray-200
                dark:bg-[#202020] dark:hover:bg-[#2a2a2a]
                border border-gray-200 dark:border-gray-700
                text-gray-700 dark:text-gray-300
                flex items-center gap-2 transition
              "
            >
              <Mail className="w-4 h-4" />
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default ProfileHeader;
