import React, { useEffect, useState } from "react";

function MenuChat(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        for (var i = 0; i < 20; i++) {
            items.push("MenuChat");
        }
    }, []);

    return (
        <div style={{ overflowY: "scroll" }}>
            MenuChat
            {items.map((item, index) => (
                <h1 key={index}>{item}</h1>
            ))}
        </div>
    );
}

export default MenuChat;
