import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import EmojiPicker from "emoji-picker-react";
import ThemeContext from "../../context/ThemeContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmojiPickerDialog({ open=false, onClosePicker, setter }) {

    const { theme } = useContext(ThemeContext);

    const handleEmojiClick = (emoji) => {
        setter(prev => prev + emoji.emoji);
    };

    return (
        <Dialog
            open={open}
            onClose={onClosePicker}
            slots={{ transition: Transition }}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: "transparent",
                        boxShadow: 0,
                        borderRadius: 2,
                    },
                },
            }}
        >
            <div className="rounded-xl overflow-hidden shadow-xl">
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    theme={theme === "dark" ? "dark" : "light"}
                    previewConfig={{ showPreview: false }}
                />
            </div>
        </Dialog>
    );
}
