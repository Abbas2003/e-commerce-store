// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  collection, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Enter your firebase project config here
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

let loginLink = document.getElementById("loginLink");
let uploadLink = document.getElementById("uploadLink");
let signupLink = document.getElementById("signupLink");
let logoutBtn = document.getElementById("logoutBtn");
let productParent = document.getElementById("productParent");
let cartCount = document.getElementById('cartCount');

let cart = [];
const products = [];
let count = 0;

// Safely get cart length from localStorage
let cartData = localStorage.getItem('cart');
if (cartData) {
  try {
    cart = JSON.parse(cartData);
    count = cart.length;
  } catch (error) {
    console.error('Error parsing cart data from localStorage:', error);
    count = 0;
  }
} else {
  count = 0;
}

let getProducts = async () => {
  const reference = collection(db, "products");
  const dt = await getDocs(reference);

  dt.forEach(dc => {
    let obj = {
      id: dc.id,
      ...dc.data(),
    };
    products.push(obj);
    renderProducts();
  });
};

getProducts();

let renderProducts = () => {
  productParent.innerHTML = "";
  products.forEach((x) => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.setAttribute('data-id', x.id);
    productParent.innerHTML += `<div id="${x.id}" class="bg-white rounded-lg overflow-hidden shadow-md">
                <img src="${x.productImage}" alt="Product Image" class="w-full h-56 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${x.productName}</h3>
                    <p class="text-gray-600 mb-4">$${x.productPrice}</p>
                    <button onclick="addToCart(this)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to cart</button>
                </div>
            </div>`;
    productParent.appendChild(productElement);
  });
};

function init() {
  let userObj = localStorage.getItem('user');
  userObj = JSON.parse(userObj);

  if (userObj) {
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    if (userObj.userType === "user") {
      uploadLink.style.display = "none";
    }
    if (userObj.userType === "admin") {
      uploadLink.className = "text-gray-600 hover:text-gray-800 mx-4";
    }
    logoutBtn.className = "text-white mx-4 inline-block bg-blue-500 p-2 rounded";
  }

  console.log("CART LENGTH: ", count);
  cartCount.innerText = count;
}

init();

window.logout = () => {
  signOut(auth)
    .then(() => {
      init();
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
    })
    .catch((err) => {
      alert(err.message);
    });
};

window.addToCart = (productId) => {
  const userObj = JSON.parse(localStorage.getItem('user'));
  if (!userObj) {
    alert('You need to log in to add items to the cart.');
    return;
  }

  const product = products.find(p => p.id === productId.parentNode.parentNode.id);
  if (!product) {
    console.error('Product not found');
    return;
  }

  cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ userId: userObj.id, ...product });
  localStorage.setItem('cart', JSON.stringify(cart));

  init();
};
