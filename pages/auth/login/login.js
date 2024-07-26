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
  apiKey: "AIzaSyBMIwK08KN7BdwtmzF50B12qzVmQQkHCQ4",
  authDomain: "sastabazar-99.firebaseapp.com",
  projectId: "sastabazar-99",
  storageBucket: "sastabazar-99.appspot.com",
  messagingSenderId: "60480813993",
  appId: "1:60480813993:web:9ad8127cd27b98125a22b8",
  measurementId: "G-34S1GPK2XG"
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
        Swal.fire({
          icon: 'success',
          title: 'Loged In!',
          text: 'You have successfully log in!',
        })
        setTimeout(() => {
          window.location.replace("../../../index.html");
        }, 3000);
        
      } else {
        alert("Data Not Found")
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email or password',
      });
    });
};
