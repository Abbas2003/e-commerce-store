// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
import {
  getFirestore,
  collection, addDoc 
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    // Enter your config here
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
let productImage = document.getElementById("productImage")

window.uploadProduct = async () => {
  const prodObj = {
    productName: productName.value,
    productDescription: productDescription.value,
    productPrice: productPrice.value,
    productCategory: productCategory.value,
    productImage: productImage.value
  }
  console.log(prodObj)


  let reference = collection(db, "products")
  let res = await addDoc(reference, prodObj)
  console.log(res)

}

let productFile = document.getElementById('productFile')
window.uploadFile = () => {
  let files = productFile.files[0]
  log(files)
}

