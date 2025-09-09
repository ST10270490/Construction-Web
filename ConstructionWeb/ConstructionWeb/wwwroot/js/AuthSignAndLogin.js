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

document.getElementById("authForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            document.getElementById("authMessage").textContent = "Welcome back!";
            bootstrap.Modal.getInstance(document.getElementById("authModal")).hide();
        })
        .catch((error) => {
            if (error.code === "auth/invalid-login-credentials") {
                // Try signup instead
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        document.getElementById("authMessage").textContent = "Account created!";
                        bootstrap.Modal.getInstance(document.getElementById("authModal")).hide();
                    })
                    .catch((signupError) => {
                        document.getElementById("authMessage").textContent = signupError.message;
                    });
            } else {
                document.getElementById("authMessage").textContent = error.message;
            }
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
