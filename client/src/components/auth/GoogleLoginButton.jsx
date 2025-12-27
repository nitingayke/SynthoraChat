import { GoogleLogin } from "@react-oauth/google";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import UIStateContext from "../../context/UIStateContext";
import { googleLoginService } from "../../services/auth.service";


export default function GoogleLoginButton() {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { setLoginUser } = useContext(AuthContext);
    const { openLoginDialog, setOpenLoginDialog } = useContext(UIStateContext);

    return (
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
                try {
                    const idToken = credentialResponse.credential;

                    const res = await googleLoginService(idToken);
                    const user = res?.data?.user;

                    setLoginUser(user);

                    if (!user?.isVerified) {
                        if (openLoginDialog) setOpenLoginDialog(false);
                        navigate("/user-verification");
                        return;
                    }

                    if (openLoginDialog) setOpenLoginDialog(false);
                    else navigate("/home");

                } catch (error) {
                    enqueueSnackbar(
                        error?.response?.data?.message || "Google login failed",
                        { variant: "error" }
                    );
                }
            }}
            onError={() => {
                enqueueSnackbar("Google login failed", { variant: "error" });
            }}
            theme="outline"
            size="large"
            width="100%"
        />
    )
}