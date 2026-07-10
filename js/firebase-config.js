// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBr3wOfclAT9o9k3wKwFLjQxv1koITVd5k",
  authDomain: "ve-naturals.firebaseapp.com",
  projectId: "ve-naturals",
  storageBucket: "ve-naturals.firebasestorage.app",
  messagingSenderId: "824851239",
  appId: "1:824851239:web:ad68ef8940eb9339b20702"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
