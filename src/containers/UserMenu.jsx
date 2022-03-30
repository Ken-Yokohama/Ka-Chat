import React, { useState } from "react";
import { MenuChat, MenuHeading } from "../components";

function UserMenu({ showMenu, setShowMenu, registeredUsers }) {
    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
            className={showMenu ? "" : "menu-container"}
        >
            <MenuHeading />
            <MenuChat registeredUsers={registeredUsers} />
        </div>
    );
}

export default UserMenu;
