import React, { useEffect, useState } from "react";

function ChatMain({ chatObjArray }) {
    useEffect(() => {
        // if (!chatObjArray) return;
        console.log(chatObjArray);
    }, [chatObjArray]);

    return (
        <div
            style={{
                flex: "1",
                overflowY: "scroll",
                display: "flex",
                flexDirection: "column-reverse",
            }}
        >
            ChatMain
        </div>
    );
}

export default ChatMain;
