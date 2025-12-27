import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import AuthContext from "../../context/AuthContext";
import UIStateContext from "../../context/UIStateContext";
import { updateEmailService } from "../../services/profile.service";
import { isValidEmail } from "../../utils/validate";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Loader2, Mail } from "lucide-react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateEmailDialog() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { loginUser, logout } = useContext(AuthContext);
  const { openEmailDialog, setOpenEmailDialog } = useContext(UIStateContext);

  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {

    const trimmedEmail = newEmail.trim();

    if (!trimmedEmail) {
      enqueueSnackbar("Email is required", { variant: "warning" });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      enqueueSnackbar("Please enter a valid email address", {
        variant: "warning",
      });
      return;
    }

    if (trimmedEmail === loginUser?.email) {
      enqueueSnackbar("New email must be different from current email", {
        variant: "warning",
      });
      return;
    }

    try {
      setLoading(true);

      await updateEmailService({
        userId: loginUser._id,
        newEmail: trimmedEmail,
      });

      enqueueSnackbar("Email updated. Please login again.", {
        variant: "success",
      });

      logout();
      navigate("/login");
    } catch (err) {
      enqueueSnackbar(
        err?.response?.data?.message || "Failed to update email",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={openEmailDialog}
      onClose={() => !loading && setOpenEmailDialog(false)}
      TransitionComponent={Transition}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <div className="bg-white/80 dark:bg-[#161616]/80 backdrop-blur-sm border-gray-200 dark:border-[#222] px-3 py-5 rounded-lg p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Mail className="text-orange-500 dark:text-[#07C5B9]" size={20} />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Update Email
          </h2>
        </div>

        {/* Current Email */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Current email:
          <span className="ml-1 font-medium text-gray-800 dark:text-gray-200">
            {loginUser?.email}
          </span>
        </div>

        {/* Input */}
        <input
          type="email"
          placeholder="Enter new email address"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full mt-1 p-3 rounded-lg bg-white dark:bg-[#181818] dark:text-white outline-none border-2 border-gray-200 dark:border-[#222] focus:border-orange-500 dark:focus:border-[#07C5B9] disabled:cursor-not-allowed"
          disabled={loading}
        />

        {/* Button */}
        <button
          disabled={loading}
          onClick={handleUpdate}
          className="w-full flex items-center justify-center gap-1 py-2 rounded-lg font-medium text-white bg-orange-500 hover:bg-orange-600 dark:bg-[#07C5B9] dark:hover:bg-[#05b1a6] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="animate-spin" size={20} />}
          {loading ? "Updating..." : "Update Email"}
        </button>
      </div>
    </Dialog>
  );
}
