import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
})

export const registerUser = (data) => api.post('/customers/register', data)
export const loginUser = (data) => api.post('/customers/login', data)
export const getProfile = () => api.get('/customers/me')
export const logoutUser = () => api.post('/customers/logout')
export const fetchProducts = (params) => api.get('/products', {params})
export const fetchProductById = (id) => api.get(`/products/${id}`)

export default api