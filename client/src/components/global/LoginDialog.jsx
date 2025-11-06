import React, { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import LoginComponent from "../common/LoginComponent";
import UIStateContext from '../../context/UIStateContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog() {

    const { openLoginDialog, setOpenLoginDialog, } = useContext(UIStateContext);

    return (
        <Dialog
            open={openLoginDialog}
            onClose={() => setOpenLoginDialog(false)}
            slots={{
                transition: Transition,
            }}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: "transparent",
                        boxShadow: 24,
                        borderRadius: 1,
                    },
                },
            }}
            maxWidth="xs"
            fullWidth
        >
            <LoginComponent />
        </Dialog>
    )
}