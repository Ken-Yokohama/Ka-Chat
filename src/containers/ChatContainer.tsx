import { Box } from "@mui/material";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ChatHeading, ChatInput, ChatMain } from "../components";
import { auth, db } from "../firebase-config";
import { Chats, User } from "../model";

interface Props {
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
    registeredUsers: User[];
    currentChatId: string | null;
    friendUid: string | null;
    friendEmail: string | null;
}

function ChatContainer({
    showMenu,
    setShowMenu,
    registeredUsers,
    currentChatId,
    friendUid,
    friendEmail,
}: Props) {
    const [chatObjArray, setChatObjArray] = useState<Chats[] | null>(null);

    useEffect(() => {
        if (!currentChatId) return;
        const nestedChatsCollectionRef = collection(
            db,
            "chats",
            currentChatId,
            "messages"
        );
        const q = query(
            nestedChatsCollectionRef,
            where("ids", "array-contains", auth?.currentUser?.uid)
        );
        const unsub = onSnapshot(q, (snapshot) => {
            setChatObjArray(
                snapshot.docs.map((chat) => ({ ...chat.data(), id: chat.id }))
            );
        });
        return unsub;
    }, [currentChatId]);

    return (
        <Box
            sx={{
                maxHeight: "100%",
                width: "100%",
                display: showMenu ? "none" : "flex",
                flexDirection: "column",
                backgroundImage:
                    "url(https://img.freepik.com/free-vector/white-elegant-texture-background-style_23-2148432200.jpg?w=2000)",
                "@media (min-width: 800px)": {
                    display: "flex",
                },
            }}
        >
            <ChatHeading
                setShowMenu={setShowMenu}
                friendEmail={friendEmail}
                registeredUsers={registeredUsers}
            />
            <ChatMain
                chatObjArray={chatObjArray}
                registeredUsers={registeredUsers}
                friendEmail={friendEmail}
            />
            <ChatInput friendUid={friendUid} currentChatId={currentChatId} />
        </Box>
    );
}

export default ChatContainer;
