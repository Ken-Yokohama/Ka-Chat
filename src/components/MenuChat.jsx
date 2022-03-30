import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function MenuChat({ registeredUsers }) {
    const handleOption = (e, value) => {
        const getUserObject = registeredUsers.find((e) => e.user == value);
        if (!getUserObject) return;
        console.log(getUserObject);
    };

    return (
        <div style={{ overflowY: "scroll" }}>
            <Autocomplete
                sx={{ padding: "1rem" }}
                id="free-solo-demo"
                freeSolo
                options={registeredUsers.map((option) => option.user)}
                onChange={handleOption}
                renderInput={(params) => (
                    <TextField {...params} label="New Message" />
                )}
            />
        </div>
    );
}

export default MenuChat;
