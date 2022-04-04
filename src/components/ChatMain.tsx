import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { Chats, User } from "../model";

interface Props {
    chatObjArray: Chats[] | null;
    registeredUsers: User[];
    friendEmail: string | null;
}

function ChatMain({ chatObjArray, registeredUsers, friendEmail }: Props) {
    const [orderedObjArray, setOrderedObjArray] = useState<Chats[] | null>(
        null
    );

    useEffect(() => {
        if (!chatObjArray) return;
        const orderArray = chatObjArray?.sort(
            (a, b) => b?.timestamp - a?.timestamp
        );
        setOrderedObjArray(orderArray);
    }, [chatObjArray]);

    return (
        <div
            style={{
                height: "0px",
                flexGrow: "1",
                overflowY: "scroll",
                display: "flex",
                flexDirection: "column-reverse",
            }}
        >
            {orderedObjArray &&
                orderedObjArray?.map((chatObj) => (
                    <Box
                        key={chatObj?.id}
                        sx={{
                            display: "flex",
                            justifyContent:
                                chatObj?.author == auth?.currentUser?.email
                                    ? "flex-end"
                                    : "flex-start",
                        }}
                    >
                        <Box
                            sx={{
                                padding: "1rem 0 0 1rem",
                                display:
                                    chatObj?.author == auth?.currentUser?.email
                                        ? "none"
                                        : "",
                            }}
                        >
                            {friendEmail && (
                                <Avatar
                                    src={
                                        registeredUsers?.length != 0
                                            ? registeredUsers?.find(
                                                  ({ user }) =>
                                                      user == friendEmail
                                              )?.avatar
                                            : ""
                                    }
                                />
                            )}
                        </Box>
                        <Box
                            style={{
                                margin: "0 1rem 0.5rem 1rem",
                                padding: "1rem",
                                borderRadius: "1rem",
                                backgroundColor:
                                    chatObj?.author == auth?.currentUser?.email
                                        ? "#78C1FF"
                                        : "#F6B561",
                            }}
                        >
                            <Box>
                                <p style={{ margin: 0, fontSize: "1rem" }}>
                                    {chatObj?.message}
                                </p>
                                <h6 style={{ fontSize: "0.75rem" }}>
                                    {chatObj?.author?.substring(
                                        0,
                                        chatObj?.author?.lastIndexOf("@")
                                    )}{" "}
                                    -{" "}
                                    {chatObj?.timestamp
                                        ?.toDate()
                                        ?.toLocaleString()}
                                </h6>
                            </Box>
                        </Box>
                    </Box>
                ))}
        </div>
    );
}

export default ChatMain;
