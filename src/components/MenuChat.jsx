import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

function MenuChat({
    registeredUsers,
    setCurrentChatId,
    setShowMenu,
    setFriendUid,
    setFriendEmail,
}) {
    const handleOption = async (e, value) => {
        const getUserObject = registeredUsers.find((e) => e.user == value);
        if (!getUserObject) return;
        if (getUserObject.user == auth?.currentUser?.email) return;
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

    return (
        <div style={{ overflowY: "scroll" }}>
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
        </div>
    );
}

export default MenuChat;
