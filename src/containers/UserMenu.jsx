import { Box } from "@mui/material";
import React, { useState } from "react";
import { MenuChat, MenuHeading } from "../components";

function UserMenu({
    showMenu,
    setShowMenu,
    registeredUsers,
    setCurrentChatId,
    setFriendUid,
    setFriendEmail,
}) {
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: showMenu ? "flex" : "none",
                flexDirection: "column",
                "@media (min-width: 800px)": {
                    display: "flex",
                },
            }}
        >
            <MenuHeading registeredUsers={registeredUsers} />
            <MenuChat
                setShowMenu={setShowMenu}
                registeredUsers={registeredUsers}
                setCurrentChatId={setCurrentChatId}
                setFriendUid={setFriendUid}
                setFriendEmail={setFriendEmail}
            />
        </Box>
    );
}

export default UserMenu;
