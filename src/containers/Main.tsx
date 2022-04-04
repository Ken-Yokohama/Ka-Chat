import { Box, Paper } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { User } from "../model";
import ChatContainer from "./ChatContainer";
import UserMenu from "./UserMenu";

function Main() {
    const [showMenu, setShowMenu] = useState(true);

    const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
        const getAllUsers = async () => {
            const users = await getDocs(usersCollectionRef);
            setRegisteredUsers(
                users.docs.map((user) => ({ ...user.data(), id: user.id }))
            );
        };
        getAllUsers();
    }, []);

    const [friendUid, setFriendUid] = useState<string | null>(null);
    const [friendEmail, setFriendEmail] = useState<string | null>(null);
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                backgroundImage: "url(/Ka-Chat/images/login-background.jpg)",
                height: "100%",
            }}
        >
            <Paper
                sx={{
                    height: "100%",
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
                    setFriendEmail={setFriendEmail}
                />
                <ChatContainer
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                    registeredUsers={registeredUsers}
                    currentChatId={currentChatId}
                    friendUid={friendUid}
                    friendEmail={friendEmail}
                />
            </Paper>
        </div>
    );
}

export default Main;
