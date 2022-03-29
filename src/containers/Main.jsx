import { Box, Paper } from "@mui/material";
import React, { useState } from "react";
import ChatContainer from "./ChatContainer";
import UserMenu from "./UserMenu";

function Main(props) {
    const [showMenu, setShowMenu] = useState(true);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Paper
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    width: "100%",
                    maxWidth: "1900px",
                    "@media(max-width: 800px)": {
                        gridTemplateColumns: "1fr",
                    },
                }}
            >
                <UserMenu showMenu={showMenu} setShowMenu={setShowMenu} />
                <ChatContainer showMenu={showMenu} setShowMenu={setShowMenu} />
            </Paper>
        </div>
    );
}

export default Main;
