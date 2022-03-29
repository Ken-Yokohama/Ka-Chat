import { Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Login(props) {
    const [toggleLogin, setToggleLogin] = useState(true);

    const handleToggleLogin = () => {
        setToggleLogin((prevValue) => !prevValue);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            {/* Login */}
            {toggleLogin && (
                <Paper
                    elevation={1}
                    style={{
                        padding: "2rem",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h3 style={{ textAlign: "center" }}>Login Your Account</h3>
                    <Box
                        sx={{
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            maxWidth: "250px",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Email"
                            style={{
                                padding: "1rem",
                                borderRadius: "1rem",
                                margin: "0 1rem",
                            }}
                        />{" "}
                        <input
                            type="text"
                            placeholder="Password"
                            style={{
                                padding: "1rem",
                                borderRadius: "1rem",
                                margin: "0 1rem",
                            }}
                        />
                        <Button sx={{ margin: "0 1rem" }} variant="contained">
                            SIGN IN
                        </Button>
                        <Button
                            sx={{
                                margin: "0 1rem",
                                display: "flex",
                                gap: "1rem",
                            }}
                            variant="outlined"
                        >
                            <FcGoogle />
                            SIGN IN WITH GOOGLE
                        </Button>
                        <h6
                            style={{
                                margin: "0 1rem",
                                fontWeight: "100",
                                fontSize: "0.75rem",
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                            onClick={handleToggleLogin}
                        >
                            Don't have an account? Register
                        </h6>
                    </Box>
                </Paper>
            )}
            {/* Register */}
            {!toggleLogin && (
                <Paper
                    elevation={1}
                    style={{
                        padding: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h3 style={{ textAlign: "center" }}>
                        Register Your Account
                    </h3>
                    <Box
                        sx={{
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            maxWidth: "230px",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Email"
                            style={{
                                padding: "1rem",
                                borderRadius: "1rem",
                                margin: "0 1rem",
                            }}
                        />{" "}
                        <input
                            type="text"
                            placeholder="Password"
                            style={{
                                padding: "1rem",
                                borderRadius: "1rem",
                                margin: "0 1rem",
                            }}
                        />
                        <Button sx={{ margin: "0 1rem" }} variant="contained">
                            Register
                        </Button>
                        <h6
                            style={{
                                margin: "0 1rem",
                                fontWeight: "100",
                                fontSize: "0.75rem",
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                            onClick={handleToggleLogin}
                        >
                            Already have an account? Login
                        </h6>
                    </Box>
                </Paper>
            )}
        </Box>
    );
}

export default Login;
