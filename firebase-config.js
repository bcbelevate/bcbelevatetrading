// Import the functions you need from the SDKs you need
// We use CDN links because we don't have a bundler like Webpack
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDw0rBOawL8YSgDLrzEopivEBf5A3N7wnc",
    authDomain: "bcb-elevate-website.firebaseapp.com",
    projectId: "bcb-elevate-website",
    storageBucket: "bcb-elevate-website.firebasestorage.app",
    messagingSenderId: "587406099664",
    appId: "1:587406099664:web:659f48763e935b5e56cad5",
    measurementId: "G-21T50C1PSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };
