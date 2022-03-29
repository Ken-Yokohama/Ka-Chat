import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./containers";
import { auth } from "./firebase-config";
import { Login } from "./pages";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState("loading");

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currUser) => {
            setIsLoggedIn(currUser);
        });
        return unsub;
    }, []);

    return (
        <div>
            <Routes>
                <Route
                    path="/*"
                    element={isLoggedIn ? <Main /> : <Navigate to="/login" />}
                />
                <Route
                    path="/login"
                    element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
                />
            </Routes>
        </div>
    );
}

export default App;
