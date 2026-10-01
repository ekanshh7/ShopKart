import { useCallback, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import Register from './pages/Register'

function App() {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('shopkart-auth') === 'true',
  )

  const handleLogin = () => {
    localStorage.setItem('shopkart-auth', 'true')
    setIsAuthenticated(true)
  }

  const handleLogout = useCallback(() => {
    localStorage.removeItem('shopkart-auth')
    setIsAuthenticated(false)
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f7f2] text-[#17211b]">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? '/me' : '/login'} replace />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/products"
            element={isAuthenticated ? <Products /> : <Navigate to="/login" replace state={{ from: location }} />}
          />
          <Route
            path="/products/:id"
            element={isAuthenticated
              ? <ProductDetails isAuthenticated={isAuthenticated} />
              : <Navigate to="/login" replace state={{ from: location }} />}
          />
          <Route
            path="/wishlist"
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" replace />}
          />
          <Route path="/cart" element={<Navigate to="/wishlist" replace />} />
          <Route
            path="/me"
            element={isAuthenticated ? <Home onUnauthenticated={handleLogout} /> : <Navigate to="/login" replace />}
          />
          <Route path="/home" element={<Navigate to="/me" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
