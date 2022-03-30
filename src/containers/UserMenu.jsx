import { Box } from "@mui/material";
import React, { useState } from "react";
import { MenuChat, MenuHeading } from "../components";

function UserMenu({
    showMenu,
    setShowMenu,
    registeredUsers,
    setCurrentChatId,
    setFriendUid,
}) {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
                display: showMenu ? "flex" : "none",
                flexDirection: "column",
                "@media (min-width: 800px)": {
                    display: "flex",
                },
            }}
        >
            <MenuHeading />
            <MenuChat
                setShowMenu={setShowMenu}
                registeredUsers={registeredUsers}
                setCurrentChatId={setCurrentChatId}
                setFriendUid={setFriendUid}
            />
        </Box>
    );
}

export default UserMenu;
