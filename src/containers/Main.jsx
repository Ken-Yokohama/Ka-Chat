import { Box, Paper } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import ChatContainer from "./ChatContainer";
import UserMenu from "./UserMenu";

function Main(props) {
    const [showMenu, setShowMenu] = useState(true);

    const [registeredUsers, setRegisteredUsers] = useState([]);

    const usersCollectionRef = collection(db, "users");

    useEffect(async () => {
        const users = await getDocs(usersCollectionRef);
        setRegisteredUsers(
            users.docs.map((user) => ({ ...user.data(), id: user.id }))
        );
    }, []);

    const [friendUid, setFriendUid] = useState(null);

    const [currentChatId, setCurrentChatId] = useState(null);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Paper
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    width: "100%",
                    maxWidth: "1900px",
                    "@media(max-width: 800px)": {
                        gridTemplateColumns: "1fr",
                    },
                }}
            >
                <UserMenu
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                    registeredUsers={registeredUsers}
                    setCurrentChatId={setCurrentChatId}
                    setFriendUid={setFriendUid}
                />
                <ChatContainer
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                    registeredUsers={registeredUsers}
                    currentChatId={currentChatId}
                    friendUid={friendUid}
                />
            </Paper>
        </div>
    );
}

export default Main;
