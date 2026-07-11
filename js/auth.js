import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

  const page = window.location.pathname.split("/").pop();

  // Login और Register page हमेशा खुलेंगे
  if (page === "login.html" || page === "register.html") {

    // अगर पहले से Login है तो Home भेज दो
    if (user) {
      window.location.href = "index.html";
    }

    return;
  }

  // बाकी सभी Pages पर Login जरूरी है
  if (!user) {
    window.location.href = "login.html";
  }

});
