# ShopKart

ShopKart is a React/Vite storefront with an Express/Mongoose API. The storefront supports customer registration and login, product browsing, and a login-gated wishlist.

## Wishlist behavior

- The wishlist is available at `/wishlist`. Unauthenticated users are redirected to `/login`.
- The product listing (`/products`) and product detail routes (`/products/:id`) also require a login.
- After login, a user is returned to the protected route they originally requested. On a product detail page, they can then select **Add to Wishlist**.
- Adding a product stores it in browser `localStorage` under `shopkart-wishlist`. An entry contains the product fields returned by the API plus a `quantity` field.
- Adding a product already in the wishlist increments its quantity. A product with zero stock cannot be added.
- The wishlist page shows saved product details and quantity. **Remove** deletes the item from the wishlist; **Continue shopping** and the empty-state button return to `/products`.
- `/cart` is retained as a compatibility route and redirects to `/wishlist`.
- Wishlist data is browser-local, not stored in MongoDB, and is not synchronized between browsers or devices. It is not cleared on logout.

### Route and authentication details

`frontend/vite-project/src/App.jsx` uses the `shopkart-auth` local-storage value to decide whether protected pages can render. A failed route check redirects to login and carries the requested route in React Router location state. `Login` uses that state after successful authentication to navigate back.

This is client-side route gating, not server-side authorization for wishlist data. The wishlist has no backend endpoint or account association at present. Product API routes are also currently mounted without the backend auth middleware. Do not treat the client-side `shopkart-auth` value or local-storage wishlist as a security boundary.

## Wishlist-related files and functions

Paths below are relative to this README's directory unless prefixed with `backend/`; backend paths are relative to the repository root.

| File | Function or export | Responsibility |
| --- | --- | --- |
| `src/App.jsx` | `App()` | Owns the client authentication flag and route table. Protects `/products`, `/products/:id`, `/wishlist`, and `/me`; redirects guests to login. Redirects legacy `/cart` requests to `/wishlist`. |
| `src/App.jsx` | `handleLogin()` | Writes `shopkart-auth=true` to local storage and updates React authentication state after successful login. |
| `src/App.jsx` | `handleLogout()` | Removes the client authentication flag and updates React state. It intentionally does not clear `shopkart-wishlist`. |
| `src/pages/ProductDetails.jsx` | `ProductDetails({ isAuthenticated })` | Loads the product identified by the `:id` route parameter, shows load/error states and product details, and renders the wishlist action. |
| `src/pages/ProductDetails.jsx` | `handleAddToWishlist()` | Checks authentication, reads `shopkart-wishlist`, adds the current product with quantity `1` or increments its existing quantity, writes the updated array, then navigates to `/wishlist`. If unauthenticated, it navigates to login with the current location as the return destination. The button is disabled when stock is zero. |
| `src/pages/ProductDetails.jsx` | `useEffect` request | Calls `fetchProductById(id)` when the route ID changes. The cleanup guard prevents a stale request from updating state after the component is no longer current. |
| `src/pages/Cart.jsx` | `readWishlist()` | Reads and parses the `shopkart-wishlist` JSON array. If the key is missing or parsing fails, it initializes the UI with an empty array. |
| `src/pages/Cart.jsx` | `Cart()` | Despite its legacy component/file name, this component renders the wishlist screen, including the empty state and saved-item list. |
| `src/pages/Cart.jsx` | `removeItem(id)` | Filters the selected product out of the in-memory wishlist, persists the new array to local storage, and updates component state. |
| `src/components/Navbar.jsx` | `Navbar({ isAuthenticated, onLogout })` | Displays the Wishlist link for authenticated users. |
| `src/components/Navbar.jsx` | `handleLogout()` | Calls the logout API, then always invokes the parent logout handler and navigates to login. |
| `src/pages/Login.jsx` | `Login({ onLogin })` | Renders the login form and uses React Router location state to restore the protected destination after successful authentication (defaults to `/me`). |
| `src/pages/Login.jsx` | `handleChange(event)` | Updates the controlled email/password form fields. |
| `src/pages/Login.jsx` | `handleSubmit(event)` | Validates required values, submits credentials using `loginUser`, updates app authentication through `onLogin`, and navigates back to the requested location. Displays login errors and resets the submit state. |
| `src/services/api.js` | `api` | Axios client shared by the frontend. Uses `VITE_API_URL` or defaults to `http://localhost:5000`; sends credentials for cookie-based requests. |
| `src/services/api.js` | `fetchProductById(id)` | Fetches product details from `GET /products/:id`. |
| `backend/index.js` | Express setup and route mounts | Mounts product routes at `/products` and `/api/products`, and customer routes at `/customers` and `/api/customers`. The wishlist itself is not implemented on the server. |
| `backend/routes/product.routes.js` | Product route declarations | Maps `GET /` and `GET /:id` to product-reading handlers; `POST /` creates a product. |
| `backend/controllers/product.controller.js` | `getAllProducts(req, res)` | Reads product filters (`search`, `category`, `sort`) and returns matching products. |
| `backend/controllers/product.controller.js` | `getProductById(req, res)` | Validates the MongoDB ObjectId and returns a product or an appropriate error response. |

`Products` and `ProductCard` are the entry to product details: `Products` loads the catalog through `fetchProducts`, while `ProductCard` links each item to `/products/:id`. `SearchBar` reports search, category, and sort changes to `Products`.

## Run locally

Install dependencies in each project directory, then start the API and frontend in separate terminals:

```sh
cd backend
npm install
npm run dev
```

```sh
cd frontend/vite-project
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` by default. The backend defaults to port `5000`; set `PORT` to override it. Configure the backend environment with:

| Variable | Purpose |
| --- | --- |
| `URL` | MongoDB connection string. Defaults to `mongodb://127.0.0.1:27017/shoptkart`. |
| `PORT` | Optional Express listening port; defaults to `5000`. |
| `JWT_SECRET` | Required signing secret for customer authentication tokens. |
| `JWT_EXPIRES_IN` | Optional token lifetime; defaults to `7d`. |
| `NODE_ENV` | Set to `production` to mark the authentication cookie secure. |

Optionally set `VITE_API_URL` in the frontend environment to point the Axios client at a non-default API origin.

## Useful commands

Run these commands from `frontend/vite-project`:

```sh
npm run dev
npm run build
npm run lint
npm run preview
```

Run these commands from `backend`:

```sh
npm run dev
npm start
npm run seed
```
