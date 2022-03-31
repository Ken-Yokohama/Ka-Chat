import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./containers";
import { auth } from "./firebase-config";
import { Loading, Login } from "./pages";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState("loading");

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currUser) => {
            setIsLoggedIn(currUser);
        });
        return unsub;
    }, []);

    return (
        <div style={{ height: "100%" }}>
            <Routes>
                <Route
                    path="/*"
                    element={
                        isLoggedIn == "loading" ? (
                            <Loading />
                        ) : isLoggedIn ? (
                            <Main />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        isLoggedIn == "loading" ? (
                            <Loading />
                        ) : !isLoggedIn ? (
                            <Login />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
