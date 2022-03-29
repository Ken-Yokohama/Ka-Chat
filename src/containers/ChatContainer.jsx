import React, { useState } from "react";
import { ChatHeading, ChatInput, ChatMain } from "../components";

function ChatContainer({ showMenu, setShowMenu }) {
    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
            className={showMenu ? "chat-container" : ""}
        >
            <ChatHeading />
            <ChatMain />
            <ChatInput />
        </div>
    );
}

export default ChatContainer;
