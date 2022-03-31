import { Box, Button, Paper, FormHelperText } from "@mui/material";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, db, SignInWithGoogle } from "../firebase-config";

function Login(props) {
    const [toggleLogin, setToggleLogin] = useState(true);

    const handleToggleLogin = () => {
        setToggleLogin((prevValue) => !prevValue);
    };

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerError, setRegisterError] = useState("");

    const registerUser = async () => {
        try {
            const userCred = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            const specificUserDoc = doc(db, "users", userCred?.user?.uid);
            await setDoc(specificUserDoc, {
                user: registerEmail,
                timestamp: serverTimestamp(),
                avatar: "",
            });
        } catch (err) {
            setRegisterError(err.message);
        }
    };

    const loginUser = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        } catch (err) {
            setLoginError(err.message);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                backgroundImage: "url(/Ka-Chat/images/login-background.jpg)",
            }}
            className="login-container"
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
                            onChange={(e) => {
                                setLoginEmail(e.target.value);
                            }}
                        />{" "}
                        <input
                            type="password"
                            placeholder="Password"
                            style={{
                                padding: "1rem",
                                borderRadius: "1rem",
                                margin: "0 1rem",
                            }}
                            onChange={(e) => {
                                setLoginPassword(e.target.value);
                            }}
                        />
                        <Button
                            sx={{ margin: "0 1rem" }}
                            variant="contained"
                            onClick={loginUser}
                        >
                            SIGN IN
                        </Button>
                        <Button
                            sx={{
                                margin: "0 1rem",
                                display: "flex",
                                gap: "1rem",
                            }}
                            variant="outlined"
                            onClick={SignInWithGoogle}
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
                        {loginError && (
                            <FormHelperText error sx={{ margin: "0 1rem" }}>
                                {loginError}
                            </FormHelperText>
                        )}
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
                            onChange={(e) => {
                                setRegisterEmail(e.target.value);
                            }}
                        />{" "}
                        <input
                            type="password"
                            placeholder="Password"
                            style={{
                                padding: "1rem",
                                borderRadius: "1rem",
                                margin: "0 1rem",
                            }}
                            onChange={(e) => {
                                setRegisterPassword(e.target.value);
                            }}
                        />
                        <Button
                            sx={{ margin: "0 1rem" }}
                            variant="contained"
                            onClick={registerUser}
                        >
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
                        {registerError && (
                            <FormHelperText error sx={{ margin: "0 1rem" }}>
                                {registerError}
                            </FormHelperText>
                        )}
                    </Box>
                </Paper>
            )}
        </Box>
    );
}

export default Login;
