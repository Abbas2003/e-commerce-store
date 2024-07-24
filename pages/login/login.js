// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

let email = document.getElementById("email");
let password = document.getElementById("password");

window.loginUser = () => {
  let obj = {
    email: email.value,
    password: password.value,
  };
  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(async (res) => {
      const id = res.user.uid;
      const reference = doc(db, "users", id);
      const snap = await getDoc(reference)
      if(snap.exists()){
        localStorage.setItem("user", JSON.stringify(snap.data()))
        console.log(res, "Success");
        window.location.replace("../../index.html")
      } else {
        alert("Data Not Found")
      }
    })
    .catch((err) => {
      alert(err.message);
    });
};
