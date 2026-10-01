import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import router from './routes/default.router.js'
import customersRoutes from './routes/customer.routes.js'
import productRoutes from './routes/product.routes.js'

dotenv.config()
const url = process.env.URL || 'mongodb://127.0.0.1:27017/shoptkart'
const port = process.env.PORT || 5000
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    const origin = req.headers.origin
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    }
    if (req.method === 'OPTIONS') return res.sendStatus(204)
    next()
})
app.use('/api', router)
app.use('/customers', customersRoutes)
app.use('/products', productRoutes)
app.use('/api/products', productRoutes)

mongoose
.connect(url)
.then(() => {
    console.log('connected to db')
})
.catch((err) => {
    console.log(err)
})

app.listen(port, () => {
    console.log(`server started at port ${port}`)
})



