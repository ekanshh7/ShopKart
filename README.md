**ShopKart** is an end-to-end e-commerce application built with MongoDB, Express.js, React 19, and Node.js. It features cookie-based JWT authentication, cart and wishlist management, an interactive product catalog, and seamless payment integration using Razorpay.

---

## 🌟 Key Features

- **🔐 Authentication & User Sessions**:
  - Secure customer registration and login with `bcrypt` password hashing.
  - JWT authorization handled via HTTP-only cookies and protected route middleware.
  - Profile management and persistent login session handling.
- **📦 Product Catalog & Exploration**:
  - Browse curated products with category filtering, search, and dynamic sorting.
  - Dedicated product detail views displaying stock status, specifications, and pricing.
  - Ready-to-run database seed script (`seed.js`) with initial sample inventory.
- **🛍️ Cart & Wishlist Experience**:
  - Real-time cart state with quantity adjustments and stock limits.
  - Persistent server-backed cart and wishlist mapped to individual customer accounts.
  - One-click wishlist toggling from catalog and product pages.
- **💳 Razorpay Payment Integration**:
  - Integrated order creation and checkout modal powered by Razorpay SDK.
  - Server-side HMAC signature verification to safeguard payment confirmations.
  - Instant transition from checkout to order confirmation.
- **📜 Order History & Tracking**:
  - Comprehensive order tracking with receipt numbers, item breakdowns, and shipping details.
  - Status updates (`Created`, `Paid`, `Failed`).

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | [React 19](https://react.dev/) | Component-based UI library |
| | [Vite 8](https://vitejs.dev/) | Next-generation frontend build tool |
| | [React Router v7](https://reactrouter.com/) | Client-side routing and protected routes |
| | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS styling |
| | [Axios](https://axios-http.com/) | Promise-based HTTP client for API communication |
| **Backend** | [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/) | RESTful API server with ES Modules |
| | [Mongoose 8](https://mongoosejs.com/) | Elegant MongoDB object modeling |
| | [JWT](https://jwt.io/) & [Cookie-Parser](https://www.npmjs.com/package/cookie-parser) | Token-based auth stored securely in cookies |
| | [Bcrypt](https://www.npmjs.com/package/bcrypt) | Salted password hashing |
| **Payments** | [Razorpay SDK](https://razorpay.com/docs/) | Payment gateway order generation and signature verification |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud NoSQL database |

---

## 📂 Project Structure

```text
ShopKart/
├── backend/                         # Express & Mongoose Backend
│   ├── config/                      # Database & server configurations
│   ├── controllers/                 # Route controllers (Auth, Cart, Order, etc.)
│   │   ├── cart.controller.js
│   │   ├── customer.controller.js
│   │   ├── order.controller.js
│   │   ├── product.controller.js
│   │   └── wishlist.controller.js
│   ├── middlewares/                 # Authentication & authorization middleware
│   │   └── auth.middleware.js
│   ├── models/                      # Mongoose data schemas
│   │   ├── customer.model.js
│   │   ├── order.model.js
│   │   └── product.model.js
│   ├── routes/                      # API endpoint definitions
│   │   ├── cart.routes.js
│   │   ├── customer.routes.js
│   │   ├── order.routes.js
│   │   ├── product.routes.js
│   │   └── wishlist.routes.js
│   ├── index.js                     # Server entry point & CORS configuration
│   ├── seed.js                      # Database seeding script for demo products
│   ├── .env.example                 # Environment variables template
│   └── package.json
│
├── frontend/
│   └── vite-project/                # React 19 + Vite Frontend
│       ├── public/                  # Public assets
│       ├── src/
│       │   ├── assets/              # Icons and local media
│       │   ├── components/          # Reusable UI components (Navbar, Cards, etc.)
│       │   ├── context/             # React Contexts (CartContext, WishlistContext)
│       │   ├── pages/               # Application views
│       │   │   ├── Cart.jsx
│       │   │   ├── Checkout.jsx
│       │   │   ├── Home.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── OrderDetails.jsx
│       │   │   ├── Orders.jsx
│       │   │   ├── ProductDetails.jsx
│       │   │   ├── Products.jsx
│       │   │   ├── Register.jsx
│       │   │   └── Wishlist.jsx
│       │   ├── services/            # Axios API client functions
│       │   │   └── api.js
│       │   ├── App.jsx              # Main routing and auth guard structure
│       │   ├── main.jsx             # React DOM mounting
│       │   └── index.css            # Tailwind CSS styling
│       ├── .env.example             # Frontend environment variables template
│       ├── package.json
│       └── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) connection string (or local MongoDB instance)
- A [Razorpay](https://dashboard.razorpay.com/) account for test API keys

---

### 1. Clone the Repository

```bash
git clone https://github.com/ekanshh7/ShopKart.git
cd ShopKart
```

---

### 2. Backend Setup

1. **Navigate to backend folder**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `backend/` directory based on `.env.example`:
   ```env
   PORT=4025
   URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/shopkart?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

4. **Seed the database (Optional but recommended)**:
   Populate MongoDB with sample products (Headphones, Keyboards, Books, etc.):
   ```bash
   npm run seed
   ```

5. **Start the backend server**:
   ```bash
   # Development mode with hot-reloading
   npm run dev

   # Production start
   npm start
   ```
   The backend API will run on **`http://localhost:4025`**.

---

### 3. Frontend Setup

1. **Open a new terminal and navigate to frontend**:
   ```bash
   cd frontend/vite-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `frontend/vite-project/` directory:
   ```env
   VITE_API_URL=http://localhost:4025/api
   ```

4. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   The client will run on **`http://localhost:5173`**.

---

## 📡 API Reference

### 🔐 Authentication (`/customers` / `/api/customers`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/customers/register` | Register a new customer | No |
| `POST` | `/customers/login` | Log in and receive auth cookie | No |
| `POST` | `/customers/logout` | Clear session cookie | No |
| `GET` | `/customers/me` | Fetch currently authenticated user | Yes |

### 📦 Products (`/products` / `/api/products`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/products` | List all products (with optional filtering) | No |
| `GET` | `/products/:id` | Get details of a single product | No |
| `POST` | `/products` | Create a new product entry | Admin/Internal |

### 🛒 Cart (`/cart` / `/api/cart`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/cart` | Retrieve current user's cart | Yes |
| `POST` | `/cart/:productId` | Add product to cart | Yes |
| `PATCH` | `/cart/:productId` | Update item quantity in cart | Yes |
| `DELETE` | `/cart/:productId` | Remove item from cart | Yes |

### ❤️ Wishlist (`/wishlist` / `/api/wishlist`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/wishlist` | Retrieve all bookmarked items | Yes |
| `POST` | `/wishlist/:productId` | Add product to wishlist | Yes |
| `DELETE` | `/wishlist/:productId` | Remove product from wishlist | Yes |

### 💳 Orders & Payments (`/orders` / `/api/orders`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/orders/create-payment-order` | Create a Razorpay order from cart items | Yes |
| `POST` | `/orders/verify-payment` | Validate signature & finalize order | Yes |
| `GET` | `/orders` | List order history for authenticated user | Yes |
| `GET` | `/orders/:id` | Fetch details of a specific order | Yes |

---

## ⚙️ Environment Variables Summary

### Backend (`backend/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port for Express server | `4025` |
| `URL` | MongoDB connection URI | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | Secret key for signing auth tokens | `your_secret_key` |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay API Secret | `your_razorpay_secret` |

### Frontend (`frontend/vite-project/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL for backend API requests | `http://localhost:4025/api` |

---

## 🔒 Security Best Practices Implemented

- Passwords hashed with **bcrypt** before database persistence.
- JWT stored in **HTTP-only, SameSite cookies** to mitigate XSS vulnerabilities.
- Razorpay payments verified server-side with **cryptographic HMAC SHA256 signatures**.
- CORS configuration restricts access to configured development and production origins.

---
