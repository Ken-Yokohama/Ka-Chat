import { Box } from "@mui/material";
import React, { useState } from "react";
import { MenuChat, MenuHeading } from "../components";
import { User } from "../model";

interface Props {
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
    registeredUsers: User[];
    setCurrentChatId: React.Dispatch<React.SetStateAction<string | null>>;
    setFriendUid: React.Dispatch<React.SetStateAction<string | null>>;
    setFriendEmail: React.Dispatch<React.SetStateAction<string | null>>;
}

function UserMenu({
    showMenu,
    setShowMenu,
    registeredUsers,
    setCurrentChatId,
    setFriendUid,
    setFriendEmail,
}: Props) {
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
