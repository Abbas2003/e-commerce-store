// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
import {
  getFirestore,
  collection, addDoc
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
const storage = getStorage();


let productName = document.getElementById("productName")
let productDescription = document.getElementById("productDescription")
let productPrice = document.getElementById("productPrice")
let productCategory = document.getElementById("productCategory")
// let productImage = document.getElementById("productImage")
let productFile = document.getElementById('productFile')
let prog = document.getElementById('prog')

window.uploadProduct = async () => {
  const prodObj = {
    productName: productName.value,
    productDescription: productDescription.value,
    productPrice: productPrice.value,
    productCategory: productCategory.value,
  }

  uploadFile()
    .then(async (url) => {
      prodObj.productImage = url;
      console.log(prodObj)
      let reference = collection(db, "products")
      let res = await addDoc(reference, prodObj)
      console.log(res)
      showNotification()
    })
    .catch((err) => {
      alert(err.message)
    })


}


let uploadFile = () => {
  return new Promise((resolve, reject) => {
    let files = productFile.files[0]
    console.log(files)
    const randomNum = Math.random().toString().slice(2);

    const storageRef = ref(storage, `images/${randomNum}`)
    var uploadTask = uploadBytesResumable(storageRef, files)

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        prog.value = progress
        switch (snapshot.state) {
          case 'paused': // or 'paused'
            console.log('Upload is paused');
            break;
          case 'running': // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        alert(error.message)
        reject(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Files is available at', downloadURL);
          resolve(downloadURL)
        })
      }
    );
  });

}

// Function to show the cart notification
function showNotification() {
  const notification = document.getElementById('productAdded-notification');
  notification.style.opacity = '1';
  notification.style.visibility = 'visible';

  // Hide the notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.visibility = 'hidden';
  }, 3000);
}