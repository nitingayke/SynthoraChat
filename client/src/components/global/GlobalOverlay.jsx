import { useContext } from "react"
import UIStateContext from "../../context/UIStateContext"
import LoginDialog from "./LoginDialog";

export default function GlobalOverlay() {

    const { openLoginDialog } = useContext(UIStateContext);

    return (
        <>
            { openLoginDialog && <LoginDialog /> }
        </>
    )
}