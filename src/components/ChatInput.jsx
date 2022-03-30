import { Box, Input, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function ChatInput({ friendUid, currentChatId }) {
    const [loadingButton, setLoadingButton] = useState(false);

    const [inputMessage, setInputMessage] = useState("");

    const handleSendMessage = async () => {
        if (!inputMessage) return;
        setLoadingButton(true);
        try {
            const nestedChatsCollectionRef = collection(
                db,
                "chats",
                currentChatId,
                "messages"
            );
            await addDoc(nestedChatsCollectionRef, {
                author: auth?.currentUser?.email,
                message: inputMessage,
                imgSrc: "",
                timestamp: serverTimestamp(),
                ids: [auth?.currentUser?.uid, friendUid],
            });
            setInputMessage("");
            setLoadingButton(false);
        } catch (err) {
            console.log(err.message);
            setLoadingButton(false);
        }
    };

    return (
        <Paper sx={{ display: "flex", padding: "0.5rem 1rem" }}>
            <Input
                id="outlined-multiline-flexible"
                placeholder={
                    currentChatId
                        ? "Enter Message"
                        : "Please Choose a User to Chat"
                }
                disabled={currentChatId ? false : true}
                multiline
                fullWidth
                disableUnderline
                sx={{
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#0f1419",
                }}
                inputProps={{ maxLength: 280 }}
                value={inputMessage}
                onChange={(e) => {
                    setInputMessage(e.target.value);
                }}
            />
            <LoadingButton
                variant="contained"
                disabled={currentChatId ? false : true}
                loading={loadingButton}
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
            >
                Send
            </LoadingButton>
        </Paper>
    );
}

export default ChatInput;
