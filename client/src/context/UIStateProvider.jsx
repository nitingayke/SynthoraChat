import { useContext, useMemo, useState } from "react"
import UIStateContext from "./UIStateContext"
import AuthContext from "./AuthContext";

export const UIStateProvider = ({ children }) => {

    const { loginUser } = useContext(AuthContext);

    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [openEmailDialog, setOpenEmailDialog] = useState(false);
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

    const values = useMemo(() => {
        const isAuthorize = () => {
            if (!loginUser) {
                setOpenLoginDialog(true);
                return false;
            }
            return true;
        }

        return {
            openLoginDialog,
            setOpenLoginDialog,
            openSidebar,
            setOpenSidebar,
            searchQuery,
            setSearchQuery,
            openEmailDialog,
            setOpenEmailDialog,
            openPasswordDialog,
            setOpenPasswordDialog,
            isAuthorize
        }
    }, [openLoginDialog, openSidebar, searchQuery, openEmailDialog, openPasswordDialog, loginUser]);

    return (
        <UIStateContext.Provider value={values}>
            {children}
        </UIStateContext.Provider>
    )
}