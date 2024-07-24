// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const cartParent = document.getElementById('cartParent')
const total = document.getElementById("total")
let cart = JSON.parse(localStorage.getItem('cart'));
let cartItems = cart.length
let sum = 0


function renderProducts() {
  console.log(cart);
  cartParent.innerHTML = ''
  if (cartItems > 0) {
    cart.forEach(product => {
      sum = sum + Number(product.productPrice)
      cartParent.innerHTML += `<div class="flex py-4 items-center">
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
            <button onclick="removeItem(this)" class="text-red-500 hover:text-red-600">Remove</button>
          </div/
        </div>
        </div>`
    });

  };

  total.innerHTML += `<div class="flex justify-between items-center">
      <p class="text-lg font-semibold">Total:</p>
      <p class="text-xl font-bold">$${sum}</p>
    </div>
    <button
    class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onclick="checkOutBtn()">Checkout
    </button>`

}
renderProducts()


window.checkOutBtn = () => {
  alert("Thank you for shopping")
}

window.removeItem = (productId) => {
  delete productId.parentNode.parentNode.parentNode
  // cart = cart.splice(productId, 1)
  // localStorage.setItem('cart', JSON.stringify(cart))
}


// function removeFromCart(productId) {
//   let cart = JSON.parse(localStorage.getItem('cart')) || [];
//   cart = cart.filter(item => item.id !== productId);
//   localStorage.setItem('cart', JSON.stringify(cart));

//   renderCart();
// }