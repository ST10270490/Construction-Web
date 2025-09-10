import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCYgQU4-ypuKX6DDXcFf_hgyer8imBNSU4",
    authDomain: "constructionappnng.firebaseapp.com",
    projectId: "constructionappnng",
    storageBucket: "constructionappnng.firebasestorage.app",
    messagingSenderId: "39802083333",
    appId: "1:39802083333:web:2b122e3f5b587f301ba46c",
    measurementId: "G-D1ZFD3H55V"
};

initializeApp(firebaseConfig);
const auth = getAuth();



document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            document.getElementById("authMessage").textContent = "Welcome back!";
            bootstrap.Modal.getInstance(document.getElementById("authModal")).hide();
        })
        .catch((error) => {
            let message = "Login failed: ";
            switch (error.code) {
                case "auth/user-not-found":
                    message += "No account found with this email.";
                    break;
                case "auth/wrong-password":
                    message += "Incorrect password.";
                    break;
                case "auth/invalid-email":
                    message += "Invalid email format.";
                    break;
                default:
                    message += error.message;
            }
            document.getElementById("authMessage").textContent = message;
        });
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            document.getElementById("authMessage").textContent = "Account created successfully!";
            bootstrap.Modal.getInstance(document.getElementById("authModal")).hide();
        })
        .catch((error) => {
            let message = "Signup failed: ";
            switch (error.code) {
                case "auth/email-already-in-use":
                    message += "This email is already registered.";
                    break;
                case "auth/weak-password":
                    message += "Password should be at least 6 characters.";
                    break;
                case "auth/invalid-email":
                    message += "Invalid email format.";
                    break;
                default:
                    message += error.message;
            }
            document.getElementById("authMessage").textContent = message;
        });
});



firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
        // Send this token to your backend via AJAX or fetch
        fetch('/Account/VerifyToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: idToken })
        });
    })
    .catch(function (error) {
        console.error('Error getting ID token:', error);
    });
