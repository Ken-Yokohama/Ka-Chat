import React, { useEffect, useState } from "react";

function ChatMain({ chatObjArray }) {
    return (
        <div
            style={{
                flex: "1",
                overflowY: "scroll",
                display: "flex",
                flexDirection: "column-reverse",
            }}
        >
            {chatObjArray &&
                chatObjArray?.map((chatObj) => (
                    <div key={chatObj?.id}>
                        <p style={{ margin: 0 }}>{chatObj?.message}</p>
                        <h6>
                            {chatObj?.author?.substring(
                                0,
                                chatObj?.author?.lastIndexOf("@")
                            )}{" "}
                            - {chatObj?.timestamp?.toDate()?.toLocaleString()}
                        </h6>
                    </div>
                ))}
        </div>
    );
}

export default ChatMain;
