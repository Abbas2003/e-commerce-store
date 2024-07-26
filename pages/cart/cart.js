// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";

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


// const cartParent = document.getElementById('cartParent')
// const total = document.getElementById("total")
// let cart = JSON.parse(localStorage.getItem('cart'));
// let cartItems = cart.length
// let sum = 0


// function renderProducts() {
//   console.log(cart);
//   cartParent.innerHTML = ''
//   if (cartItems > 0) {
//     cart.forEach(product => {
//       sum = sum + Number(product.productPrice)
//       cartParent.innerHTML += `<div class="flex py-4 items-center">
//       <div class="flex-shrink-0">
//       <img src="${product.productImage}" alt="Product image" class="h-16 w-16 rounded">
//       </div>
//       <div class="ml-4 flex-1">
//           <div class="flex justify-between">
//               <h2 class="text-lg font-semibold">${product.productName}</h2>
//               <p class="text-gray-600">$${product.productPrice}</p>
//           </div>
//           <div class="flex justify-between">
//             <p class="text-gray-500">Quantity: 1</p>
//             <button onclick="removeItem(this)" class="text-red-500 hover:text-red-600">Remove</button>
//           </div/
//         </div>
//         </div>`
//     });

//   };

//   total.innerHTML += `<div class="flex justify-between items-center">
//       <p class="text-lg font-semibold">Total:</p>
//       <p class="text-xl font-bold">$${sum}</p>
//     </div>
//     <button
//     class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onclick="checkOutBtn()">Checkout
//     </button>`

// }
// renderProducts()


// window.checkOutBtn = () => {
//   alert("Thank you for shopping")
// }

// window.removeItem = (productId) => {
//   delete productId.parentNode.parentNode.parentNode
//   // cart = cart.splice(productId, 1)
//   // localStorage.setItem('cart', JSON.stringify(cart))
// }




// Get DOM elements
const cartParent = document.getElementById('cartParent');
const total = document.getElementById("total");

// Initialize cart and sum
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let sum = 0;

// Function to render products in the cart
function renderProducts() {
  cartParent.innerHTML = ''; // Clear current cart contents
  sum = 0; // Reset sum

  if (cart.length > 0) {
    cart.forEach((product, index) => {
      // Update sum
      sum += Number(product.productPrice);

      // Render each product
      cartParent.innerHTML += `<div class="flex py-4 items-center" data-index="${index}">
        <div class="flex-shrink-0">
          <img src="${product.productImage}" alt="Product image" class="h-16 w-16 rounded">
        </div>
        <div class="ml-4 flex-1">
          <div class="flex justify-between">
            <h2 class="text-lg font-semibold">${product.productName}</h2>
            <p class="text-gray-600">$${product.productPrice}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-500">Quantity: 1</p>
            <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-600">Remove</button>
          </div>
        </div>
      </div>`;
    });
  }

  // Update total price
  total.innerHTML = `<div class="flex justify-between items-center">
    <p class="text-lg font-semibold">Total:</p>
    <p class="text-xl font-bold">$${sum.toFixed(2)}</p>
  </div>
  <button
    class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onclick="checkOutBtn()">Checkout
  </button>`;
}

renderProducts();

// Checkout button functionality
window.checkOutBtn = () => {
  alert("Thank you for shopping");
  // Clear cart after checkout
  localStorage.removeItem('cart');
  cart = [];
  renderProducts();
};

// Remove item from cart
window.removeItem = (index) => {
  // Remove item from cart array
  cart.splice(index, 1);

  // Update local storage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Re-render products to reflect changes
  renderProducts();
};
