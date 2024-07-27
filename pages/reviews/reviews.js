import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
    getFirestore,
    doc,
    getDoc,
    addDoc,
    getDocs,
    query,
    collection
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import {
    getAuth,
    signOut,
  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

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
const db = getFirestore();
const auth = getAuth()


const id = localStorage.getItem('productId')
console.log(id);

function init() {
    let productsLink = document.getElementById("productsLink")
    let uploadLink = document.getElementById("uploadLink")
    let productsLinkMobile = document.getElementById("productsLinkMobile")
    let uploadLinkMobile = document.getElementById("uploadLinkMobile")
    let userObj = localStorage.getItem('user');
    userObj = JSON.parse(userObj);

    if (userObj) {
        if (userObj.userType === "user") {
            productsLink.style.display = "none";
            productsLinkMobile.style.display = "none";
            uploadLink.style.display = "none";
            uploadLinkMobile.style.display = "none";
        }
        if (userObj.userType === "admin") {
            uploadLink.className = "text-gray-600 hover:text-gray-800 mx-4";
            uploadLinkMobile.className = "text-gray-600 hover:text-gray-800 px-4 py-2";
        }
        logoutBtn.className = "text-white mx-4 inline-block bg-blue-500 p-2 rounded";
        logoutBtnMobile.className = "text-white my-2 inline-block bg-blue-500 p-2 rounded";
    }

}

init()

let getProduct = async (id) => {
    try {
        // Create a reference to the document
        const docRef = doc(db, "products", id);

        // Fetch the document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Document data
            console.log("Product data:", docSnap.data());
            const productData = docSnap.data();

            // Example: Render product details on the page
            renderProductDetails(productData);
        } else {
            // No document found
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
    }
};

getProduct(id);

function renderProductDetails(product) {
    const productContainer = document.getElementById("product-description");

    productContainer.innerHTML = `
      <h1 class="text-3xl font-bold mb-4">${product.productName}</h1>
      <p><span class="text-blue-500 font-bold">Category:</span> ${product.productCategory}</p>
      <img src="${product.productImage}" alt="${product.productName}" class="w-full h-64 object-cover rounded mb-4">
      <p class="text-xl text-blue-600 font-semibold">Price: $${product.productPrice}</p>
      <p class="mt-4"><span class="text-blue-500 font-bold">Description:</span> ${product.productDescription}</p>
    `;
}

// Sample initial reviews array
let reviews = [];

// Function to render reviews
function renderReviews() {
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';

    reviews.forEach((review) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'bg-gray-100 p-4 rounded-lg mb-4';

        reviewItem.innerHTML = `
      <p class="text-lg font-semibold">${review.name} <span class="text-sm text-gray-500">(${review.date})</span></p>
      <p class="text-gray-700">${review.text}</p>
    `;

        reviewList.appendChild(reviewItem);
    });
}

// Handle form submission
const addReviewForm = document.getElementById('add-review-form');
addReviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('reviewer-name').value;
    const text = document.getElementById('review-text').value;
    const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    const newReview = {
        name: name,
        text: text,
        date: date,
    };

    try {
        // Assume productId is obtained from URL or elsewhere
        const productId = id;

        // Add a new document to the reviews subcollection for this product
        const docRef = await addDoc(collection(db, 'products', productId, 'reviews'), newReview);

        console.log('Review added with ID:', docRef.id);

        // Add the new review to the reviews array and re-render
        reviews.push(newReview);
        console.log(newReview);
        renderReviews();

        // Show the notification
        showReviewNotification();

        // Clear form fields
        addReviewForm.reset();

    } catch (error) {
        console.error('Error adding review:', error);
    }
});

// Load reviews from Firestore on page load
window.addEventListener('load', async () => {
    let productId = id;

    try {
        let q = query(collection(db, 'products', productId, 'reviews'));
        let querySnapshot = await getDocs(q);

        reviews = querySnapshot.docs.map(doc => doc.data());
        renderReviews();
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
});


// Function to show the cart notification
function showReviewNotification() {
    const notification = document.getElementById('review-notification');
    notification.style.opacity = '1';
    notification.style.visibility = 'visible';

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.visibility = 'hidden';
    }, 3000);
}


// JavaScript to handle mobile menu toggle
document.getElementById('menu-button').addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});


window.logout = () => {
    signOut(auth)
      .then(() => {
        init();
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };