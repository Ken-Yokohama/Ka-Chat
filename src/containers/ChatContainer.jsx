import { Box } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ChatHeading, ChatInput, ChatMain } from "../components";
import { auth, db } from "../firebase-config";

function ChatContainer({ showMenu, setShowMenu, currentChatId }) {
    const [chatObjArray, setChatObjArray] = useState(null);

    useEffect(() => {
        if (!currentChatId) return;
        const nestedChatsCollectionRef = collection(
            db,
            "chats"
            // currentChatId,
            // "messages"
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
                height: "100vh",
                width: "100%",
                display: showMenu ? "none" : "flex",
                flexDirection: "column",
                "@media (min-width: 800px)": {
                    display: "flex",
                },
            }}
        >
            <ChatHeading />
            <ChatMain chatObjArray={chatObjArray} />
            <ChatInput />
        </Box>
    );
}

export default ChatContainer;
