import { useMemo, useState } from "react"
import UIStateContext from "./UIStateContext"

export const UIStateProvider = ({ children }) => {

    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [openEmailDialog, setOpenEmailDialog] = useState(false);
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

    const values = useMemo(() => ({
        openLoginDialog,
        setOpenLoginDialog,
        openSidebar,
        setOpenSidebar,
        searchQuery,
        setSearchQuery,
        openEmailDialog,
        setOpenEmailDialog,
        openPasswordDialog,
        setOpenPasswordDialog
    }), [openLoginDialog, openSidebar, searchQuery, openEmailDialog, openPasswordDialog]);

    return (
        <UIStateContext.Provider value={values}>
            {children}
        </UIStateContext.Provider>
    )
}