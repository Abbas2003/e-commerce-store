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

    productParent.innerHTML += `<div id="${x.id}" onclick="getId('${x.id}')" class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src="${x.productImage}" alt="Product Image" class="w-full h-56 object-cover">
                <div class="p-5">
                    <h3 class="text-2xl font-bold mb-2">${x.productName}</h3>
                    <div class="flex justify-between items-center">
                      <p class="text-gray-600 mb-4">$${x.productPrice}</p>
                      <div class="flex space-x-2">
                        <p class="text-gray-600 mb-4">Add to wishlist</p>
                        <i class="far fa-star text-gray-400 hover:text-yellow-500 cursor-pointer text-xl" onclick="toggleWishlist(this, '${x.id}')"></i>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <button onclick="addToCart(this)" class="hover:bg-blue-500 hover:text-white rounded-full text-black font-semibold py-2 px-4">Add to cart</button>
                      <button class=" hover:bg-blue-500 hover:text-white text-black font-semibold py-2 px-4 rounded-full"><a href="../pages/reviews/reviews.html" class="">Reviews</a></button>
                      
                    </div>
                </div>
            </div>`;

  });
};


window.getId = (id) => {
  localStorage.setItem('productId', id)
  console.log(id);
}


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

// Function to show the cart notification
function showCartNotification() {
  const notification = document.getElementById('cart-notification');
  notification.style.opacity = '1';
  notification.style.visibility = 'visible';

  // Hide the notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.visibility = 'hidden';
  }, 3000);
}

// Updated addToCart function to include the notification
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

  // Show the notification
  showCartNotification();

  init();
};

// wishlist.js

// Check if wishlist exists in localStorage
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to toggle wishlist
window.toggleWishlist = (element, productId) => {
  const index = wishlist.indexOf(productId);
  const notification = document.getElementById('wishlist-notification');

  if (index === -1) {
    // Add to wishlist
    wishlist.push(productId);
    element.classList.remove('far'); // Change star to filled
    element.classList.add('fas', 'text-yellow-500'); // Change color to yellow
    // notification.innerText = "Product added to wishlist!";
  } else {
    // Remove from wishlist
    wishlist.splice(index, 1);
    element.classList.remove('fas', 'text-yellow-500'); // Remove filled star
    element.classList.add('far'); // Revert to outline
    // notification.innerText = "Product removed from wishlist!";
  }

  // Update localStorage
  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  // Show notification
  showNotification(notification);
}

// Function to show notification
function showNotification(notification) {
  notification.classList.remove('hidden');
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 2000);
}

// Initialize stars based on wishlist
window.onload = () => {
  document.querySelectorAll('.fa-star').forEach(star => {
    const productId = star.getAttribute('onclick').split("'")[1];
    if (wishlist.includes(productId)) {
      star.classList.remove('far');
      star.classList.add('fas', 'text-yellow-500');
    }
  });
};


// JavaScript to handle mobile menu toggle
document.getElementById('menu-button').addEventListener('click', function () {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
});