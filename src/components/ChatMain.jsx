import React, { useEffect, useState } from "react";

function ChatMain({ chatObjArray }) {
    const [orderedObjArray, setOrderedObjArray] = useState(null);

    useEffect(() => {
        if (!chatObjArray) return;
        const orderArray = chatObjArray.sort(
            (a, b) => b.timestamp - a.timestamp
        );
        setOrderedObjArray(orderArray);
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
            {orderedObjArray &&
                orderedObjArray?.map((chatObj) => (
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
