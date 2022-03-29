import React, { useEffect, useState } from "react";

function ChatMain(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        for (var i = 0; i < 20; i++) {
            items.push("MenuChat");
        }
    }, []);

    return (
        <div style={{ flex: "1", overflowY: "scroll" }}>
            ChatMain
            {items.map((item, index) => (
                <h1 key={index}>{item}</h1>
            ))}
        </div>
    );
}

export default ChatMain;
