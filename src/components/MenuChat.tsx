import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Box } from "@mui/system";
import { Avatar } from "@mui/material";
import { Chats, User } from "../model";

interface Props {
    registeredUsers: User[];
    setCurrentChatId: React.Dispatch<React.SetStateAction<string | null>>;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setFriendUid: React.Dispatch<React.SetStateAction<string | null>>;
    setFriendEmail: React.Dispatch<React.SetStateAction<string | null>>;
}

function MenuChat({
    registeredUsers,
    setCurrentChatId,
    setShowMenu,
    setFriendUid,
    setFriendEmail,
}: Props) {
    const handleOption = async (e: any, value: any) => {
        const getUserObject = registeredUsers.find((e) => e.user == value);
        if (!getUserObject) return;
        if (getUserObject.user == auth?.currentUser?.email) return;
        if (getUserObject.id == undefined) return;
        if (getUserObject.user == undefined) return;
        if (auth?.currentUser?.uid == undefined) return;

        setFriendUid(getUserObject?.id);
        setFriendEmail(getUserObject?.user);

        const userChatRefA = doc(
            db,
            "users",
            auth?.currentUser?.uid,
            "chats",
            getUserObject?.id
        );

        const checkIfAlreadyChatted = await getDoc(userChatRefA);
        // Check if Chat Already Exists
        if (checkIfAlreadyChatted.exists()) {
            setCurrentChatId(checkIfAlreadyChatted.data().chatId);
            setShowMenu(false);
        } else {
            const chatsCollectionRef = await collection(db, "chats");
            // Create Chat in Chats Collection
            const chatData = await addDoc(chatsCollectionRef, {
                author: "admin",
                message: "New Chat Created!",
                timestamp: serverTimestamp(),
                ids: [auth?.currentUser?.uid, getUserObject?.id],
            });

            // Add Chats Collection Ref to Nest Chat of Logged In User
            await setDoc(userChatRefA, {
                user: getUserObject.user,
                chatId: chatData.id,
            });

            const userChatRefB = doc(
                db,
                "users",
                getUserObject?.id,
                "chats",
                auth?.currentUser?.uid
            );

            // Add Chats Collection Ref to Nested Chat of Chatted User
            await setDoc(userChatRefB, {
                user: auth?.currentUser?.email,
                chatId: chatData.id,
            });

            setCurrentChatId(chatData.id);
            setShowMenu(false);
        }
    };

    const [previousChats, setPreviousChats] = useState<
        {
            user?: string | undefined;
            chatId?: string | undefined;
            id?: string | undefined;
        }[]
    >([]);

    useEffect(() => {
        const runEffect = async () => {
            if (auth?.currentUser?.uid == undefined) return;
            const usersChatCollectionRef = collection(
                db,
                "users",
                auth?.currentUser?.uid,
                "chats"
            );

            const chats = await getDocs(usersChatCollectionRef);
            setPreviousChats(
                chats.docs.map((chatUsers) => ({
                    ...chatUsers?.data(),
                    id: chatUsers?.id,
                }))
            );
        };
        runEffect();
    }, []);

    const handleOpenOldChat = (
        email: string | undefined,
        chatId: string | undefined
    ) => {
        const getUserObject = registeredUsers.find((e) => e.user == email);
        if (getUserObject?.id == undefined) return;
        if (getUserObject?.user == undefined) return;
        if (!chatId) return;
        setFriendUid(getUserObject?.id);
        setFriendEmail(getUserObject?.user);
        setCurrentChatId(chatId);
        setShowMenu(false);
    };

    return (
        <div style={{ overflowY: "scroll", height: "0px", flexGrow: "1" }}>
            <Autocomplete
                sx={{ padding: "1rem" }}
                id="free-solo-demo"
                freeSolo
                options={registeredUsers.map((option) => option.user)}
                onChange={handleOption}
                renderInput={(params) => (
                    <TextField {...params} label="New Message" />
                )}
            />
            {previousChats.map((prevChat) => (
                <Box
                    sx={{
                        padding: "1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        cursor: "pointer",
                        ":hover": {
                            backgroundColor: "#E0E0E0",
                        },
                    }}
                    key={prevChat?.id}
                    onClick={() => {
                        handleOpenOldChat(prevChat?.user, prevChat?.chatId);
                    }}
                >
                    <Avatar
                        src={
                            registeredUsers.length != 0
                                ? registeredUsers?.find(
                                      ({ id }) => id == prevChat?.id
                                  )?.avatar
                                : ""
                        }
                    />
                    <p style={{ margin: "0" }}>{prevChat?.user}</p>
                </Box>
            ))}
        </div>
    );
}

export default MenuChat;
