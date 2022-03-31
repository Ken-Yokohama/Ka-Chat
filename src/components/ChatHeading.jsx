import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Paper } from "@mui/material";

function ChatHeading({ setShowMenu, friendEmail, registeredUsers }) {
    return (
        <Paper
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "orange",
                borderRadius: "0",
            }}
        >
            <ArrowBackIcon
                sx={{
                    cursor: "pointer",
                    "@media (min-width: 800px)": { visibility: "hidden" },
                }}
                onClick={() => {
                    setShowMenu(true);
                }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {friendEmail}{" "}
                {friendEmail && (
                    <Avatar
                        src={
                            registeredUsers.length != 0
                                ? registeredUsers?.find(
                                      ({ user }) => user == friendEmail
                                  ).avatar
                                : ""
                        }
                    />
                )}
            </div>
        </Paper>
    );
}

export default ChatHeading;
