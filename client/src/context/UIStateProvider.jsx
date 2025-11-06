import { useMemo, useState } from "react"
import UIStateContext from "./UIStateContext"

export const UIStateProvider = ({ children }) => {

    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    const values = useMemo(() => ({
        openLoginDialog,
        setOpenLoginDialog,
        openSidebar,
        setOpenSidebar,
        searchQuery,
        setSearchQuery
    }), [openLoginDialog, openSidebar, searchQuery]);
    
    return (
        <UIStateContext.Provider value={values}>
            { children }
        </UIStateContext.Provider>
    )
}