# E-Commerce Store

[Live Demo](https://sastabazar-99.web.app/)

## Overview
This is a fully functional e-commerce web application built entirely with **Vanilla JavaScript** and powered by **Firebase Authentication**, **Firebase Storage**, and **Firestore Database**. The platform provides distinct **Admin** and **User** dashboards, allowing administrators to manage products while users can browse, add to cart, create wishlists, and review products.

### Features

#### Admin Dashboard:
- **Add, Update, Delete Products:** Admins can easily manage the product catalog through an intuitive dashboard.
- **Real-Time Product Management:** All changes reflect instantly using Firestore.
- **Product Image Upload:** Leverages Firebase Storage for secure and seamless image uploads for products.

#### User Dashboard:
- **Add to Cart:** Users can add products to their cart for checkout.
- **Wishlist Functionality:** Users can save products they want to purchase later to their wishlists.
- **Product Reviews:** Users can leave reviews for any product, allowing better engagement.
- **Custom Notifications:** Users receive real-time, custom notifications for actions like adding to cart or updating wishlists.

### Technology Stack:
- **Frontend:** HTML, TailwindCSS, Vanilla JavaScript
- **Backend:** Firebase Authentication, Firestore Database, Firebase Storage
- **Hosting:** Firebase Hosting

### Setup & Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/Abbas2003/e-commerce-store.git
   ```
2. Navigate to the project directory:
   ```bash
   cd e-commerce-store
   ```
3. Install dependencies (if any):
   ```bash
   npm install
   ```
4. Set up Firebase for your project:
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable Authentication, Firestore Database, and Firebase Storage.
   - Update Firebase configuration in the project’s JavaScript files (usually in `firebaseConfig.js`).
   
5. Start the application:
   Open the `index.html` file in a browser to view the application.

### Usage
- **Admin Access:** Log in with an admin account to access the admin dashboard where you can manage products.
- **User Access:** Register or log in with a user account to browse products, add items to the cart or wishlist, and leave reviews.

### Contributions
Feel free to fork this repository and submit pull requests. Contributions are always welcome!

---

