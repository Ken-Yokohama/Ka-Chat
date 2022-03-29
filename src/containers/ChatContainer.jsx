import React, { useState } from "react";

function ChatContainer({ showMenu, setShowMenu }) {
    return (
        <div
            style={{ height: "100vh", width: "100%" }}
            className={showMenu ? "chat-container" : ""}
        >
            ChatContainer
        </div>
    );
}

export default ChatContainer;
