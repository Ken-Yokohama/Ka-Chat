import React, { useEffect, useState } from "react";
import { Button, Paper, TextField, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import { Box } from "@mui/system";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase-config";
import Modal from "@mui/material/Modal";
import { doc, updateDoc } from "firebase/firestore";
import { User } from "../model";

interface Props {
    registeredUsers: User[];
}

function MenuHeading({ registeredUsers }: Props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopover = (event: any) => {
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

    // Modal Functions
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Handle Image Url Update
    const [newAvatarUrl, setNewAvatarUrl] = useState("");

    const updateAvatar = async () => {
        if (!newAvatarUrl) return;
        if (!auth?.currentUser?.uid) return;
        const specificUserRef = doc(db, "users", auth?.currentUser?.uid);
        await updateDoc(specificUserRef, { avatar: newAvatarUrl });
        handleCloseModal();
        window.location.reload();
    };

    // Get Curr User Avatar
    const [currUserAvatar, setCurrUserAvatar] = useState<{
        avatar?: string;
        id?: string;
        timestamp?: any;
        user?: string;
    }>({});

    useEffect(() => {
        if (registeredUsers.length == 0) return;
        const getUserObj = registeredUsers.find(
            ({ id }) => id == auth?.currentUser?.uid
        );
        if (getUserObj == undefined) return;
        setCurrUserAvatar(getUserObj);
    }, [registeredUsers]);

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
                src="/Ka-Chat/images/ka-chat-logo1.png"
                alt=""
                style={{ width: "100px" }}
            />
            <Tooltip title="Change Avatar" arrow>
                <Avatar
                    src={currUserAvatar.avatar}
                    sx={{ cursor: "pointer" }}
                    onClick={handleOpenModal}
                />
            </Tooltip>

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
                        onClick={handleOpenModal}
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
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "white",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        alignItems: "flex-end",
                    }}
                >
                    <TextField
                        id="standard-basic"
                        label="Enter an Image Url"
                        variant="standard"
                        fullWidth
                        onChange={(e) => {
                            setNewAvatarUrl(e.target.value);
                        }}
                    />
                    <Button onClick={updateAvatar}>Update</Button>
                </Box>
            </Modal>
        </Paper>
    );
}

export default MenuHeading;
