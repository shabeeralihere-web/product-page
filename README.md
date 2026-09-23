# ProductHub Frontend

ProductHub is a MERN stack e-commerce application frontend built with React.js.

The application provides authentication, role-based access, product management, product browsing, cart management, checkout, profile management, and admin/seller features.

## Tech Stack

- React.js
- JavaScript
- React Router
- Axios
- React Bootstrap
- React Icons
- React Toastify
- CSS
- Context API
- JWT Authentication
- LocalStorage

## Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Logout
- Protected routes
- Role-based access control
- Authentication state management
- Login and signup validation
- Persistent login using LocalStorage

### User Roles

ProductHub supports three user roles:

- User
- Seller
- Admin

Each role has different permissions and access to different pages.

### User Features

Users can:

- View products
- Search products
- View product details
- Add products to cart
- Update cart quantity
- Remove products from cart
- Clear cart
- Checkout
- Place orders
- View profile
- Update profile
- Upload profile image

### Seller Features

Sellers can:

- View available products
- Add products
- View their own products
- Edit their products
- Delete their products
- Manage their products
- Manage cart
- Checkout
- Manage profile

### Admin Features

Admins can:

- View products
- Add products
- Edit products
- Delete products
- Access admin dashboard
- Manage users
- Manage profile

## Product Features

- Product listing
- Product details
- Product search
- Product pagination
- Product categories
- Product image upload
- Add product
- Edit product
- Delete product
- Seller-specific product management
- Role-based product permissions

## Cart Features

- Add product to cart
- View cart
- Increase product quantity
- Decrease product quantity
- Remove product from cart
- Clear cart
- Display cart item count
- Navigate from cart item to product details

## Checkout Features

- Product checkout
- Delivery address form
- Full name validation
- Phone number validation
- Address validation
- City and state fields
- PIN code validation
- Payment method selection
- Order creation

## Profile Features

- View user profile
- Edit first name
- Edit last name
- Edit bio
- Upload profile image
- Display user role
- Display account information

## API Integration

The frontend communicates with the ProductHub backend using Axios.

The backend provides APIs for:

- Authentication
- Users
- Products
- Cart
- Orders
- Profile

The frontend sends JWT tokens with protected API requests.

Example:

```text
Authorization: Bearer <accessToken>


## Project Structure

productpage/
│
├── build/
│
├── public/
│   ├── index.html
│   └── ProductHub.png
│
├── src/
│   │
│   ├── Components/
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── Product.jsx
│   │
│   ├── pages/
│   │   ├── AddProduct.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Checkout.jsx
│   │   ├── EditProduct.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyProducts.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   ├── Profile.jsx
│   │   ├── SellerDashboard.jsx
│   │   ├── Signup.jsx
│   │   └── Unauthorized.jsx
│   │
│   ├── Styles/
│   │   ├── AddProduct.css
│   │   ├── AdminDashboard.css
│   │   ├── animations.css
│   │   ├── Cart.css
│   │   ├── Checkout.css
│   │   ├── EditProduct.css
│   │   ├── Footer.css
│   │   ├── global.css
│   │   ├── Home.css
│   │   ├── Login.css
│   │   ├── MyProducts.css
│   │   ├── Navbar.css
│   │   ├── NotFound.css
│   │   ├── Profile.css
│   │   ├── Signup.css
│   │   ├── Unauthorized.css
│   │   └── variables.css
│   │
│   ├── uploads/
│   │
│   ├── api.js
│   ├── App.js
│   └── index.js
│
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── README.md