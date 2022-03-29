import React, { useState } from "react";

function UserMenu({ showMenu, setShowMenu }) {
    return (
        <div
            style={{ height: "100vh", width: "100vw" }}
            className={showMenu ? "" : "menu-container"}
        >
            UserMenu
        </div>
    );
}

export default UserMenu;
