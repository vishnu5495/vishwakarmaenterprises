import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document.querySelector('input[name="password"]').value;

  try {

    await signInWithEmailAndPassword(auth, email, password);

    alert("Login Successful!");

    window.location.href = "index.html";

  } catch (error) {

    alert(error.message);

  }

});
