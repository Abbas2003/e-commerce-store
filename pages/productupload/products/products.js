// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your Firebase configuration
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
const db = getFirestore(app);

let products = [];

// Function to fetch products from Firestore
const fetchProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderProductTable(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Function to render product table
const renderProductTable = (products) => {
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = '';

    products.forEach((product, index) => {
        const productRow = document.createElement('tr');

         // Alternate row colors
         const rowClass = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';

         productRow.className = `${rowClass} hover:bg-gray-100`;

        productRow.innerHTML = `
            <td class="py-2 px-4 border-b border-gray-300"><img src="${product.productImage}" alt="Product Image" class="w-16 h-16 object-cover rounded"></td>
            <td class="py-2 px-4 border-b border-gray-300">${product.productName}</td>
            <td class="py-2 px-4 border-b border-gray-300">$${product.productPrice}</td>
            <td class="py-2 px-4 border-b border-gray-300">
                <button onclick="deleteProduct('${product.id}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </td>
        `;
        productTableBody.appendChild(productRow);
    });
};

// Function to delete a product
window.deleteProduct = async (productId) => {
    try {
        await deleteDoc(doc(db, 'products', productId));
        products = products.filter(product => product.id !== productId);
        renderProductTable(products);
        Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success"
          });
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
    }
};

// Function to filter products based on search input
const filterProducts = () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchInput) ||
        product.productPrice.toString().includes(searchInput)
    );
    renderProductTable(filteredProducts);
};

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', filterProducts);

// Fetch products on page load
fetchProducts();
