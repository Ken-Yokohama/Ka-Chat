import React, { useState } from "react";
import { Paper } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import { Box } from "@mui/system";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase-config";

function MenuHeading(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? "simple-popover" : undefined;

    const logoutUser = async () => {
        await signOut(auth);
    };

    return (
        <Paper
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 1rem",
                backgroundColor: "#F79C43",
                borderRadius: "0",
            }}
        >
            <SettingsIcon
                fontSize="medium"
                aria-describedby={id}
                onClick={handlePopover}
                sx={{ cursor: "pointer" }}
            />
            <img
                src="/images/ka-chat-logo1.png"
                alt=""
                style={{ width: "100px" }}
            />
            <Avatar />

            {/* Popover for Settings */}
            <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        component="h5"
                        sx={{
                            padding: "1rem",
                            cursor: "pointer",
                            fontWeight: "400",
                            ":hover": {
                                backgroundColor: "#E0E0E0",
                            },
                        }}
                    >
                        Change Avatar
                    </Box>
                    <Box
                        component="h5"
                        sx={{
                            padding: "1rem",
                            cursor: "pointer",
                            fontWeight: "400",
                            ":hover": {
                                backgroundColor: "#E0E0E0",
                            },
                        }}
                        onClick={logoutUser}
                    >
                        Sign Out
                    </Box>
                </div>
            </Popover>
        </Paper>
    );
}

export default MenuHeading;
