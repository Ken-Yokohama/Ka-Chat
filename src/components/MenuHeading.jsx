import React, { useState } from "react";
import { Paper } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import { Box } from "@mui/system";

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

    return (
        <Paper
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 1rem",
            }}
        >
            <SettingsIcon
                fontSize="medium"
                aria-describedby={id}
                onClick={handlePopover}
                sx={{ cursor: "pointer" }}
            />
            <h1>Ka-Chat</h1>
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
                    >
                        Sign Out
                    </Box>
                </div>
            </Popover>
        </Paper>
    );
}

export default MenuHeading;
