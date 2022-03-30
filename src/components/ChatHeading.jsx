import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Paper } from "@mui/material";

function ChatHeading({ setShowMenu, friendEmail }) {
    return (
        <Paper
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
            }}
        >
            <ArrowBackIcon
                sx={{
                    cursor: "pointer",
                    "@media (min-width: 800px)": { display: "none" },
                }}
                onClick={() => {
                    setShowMenu(true);
                }}
            />
            <div>{friendEmail}</div>
        </Paper>
    );
}

export default ChatHeading;
