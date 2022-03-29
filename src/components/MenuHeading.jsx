import React, { useState } from "react";
import { Paper } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";

function MenuHeading(props) {
    return (
        <Paper
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 1rem",
            }}
        >
            <SettingsIcon fontSize="medium" />
            <h1>Ka-Chat</h1>
            <Avatar />
        </Paper>
    );
}

export default MenuHeading;
