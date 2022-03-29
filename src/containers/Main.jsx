import { Box } from "@mui/material";
import React, { useState } from "react";
import ChatContainer from "./ChatContainer";
import UserMenu from "./UserMenu";

function Main(props) {
    const [showMenu, setShowMenu] = useState(true);

    return (
        <Box style={{ display: "flex" }}>
            <UserMenu showMenu={showMenu} setShowMenu={setShowMenu} />
            <ChatContainer showMenu={showMenu} setShowMenu={setShowMenu} />
        </Box>
    );
}

export default Main;
