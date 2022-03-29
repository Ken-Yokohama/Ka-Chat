// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
    doc,
    getDoc,
    getFirestore,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const SignInWithGoogle = async () => {
    try {
        const userCred = await signInWithPopup(auth, provider);
        const specificUserDoc = doc(db, "users", userCred?.user?.uid);
        const inFirestore = await getDoc(specificUserDoc);
        if (inFirestore.exists()) {
        } else {
            await setDoc(specificUserDoc, {
                user: userCred?.user?.email,
                timestamp: serverTimestamp(),
                avatar: "",
            });
        }
    } catch (err) {
        console.log(err.message);
    }
};
