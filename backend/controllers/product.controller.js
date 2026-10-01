import mongoose from 'mongoose'
import Product from '../models/product.model.js'

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        return res.status(201).json({success: true, product})
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}

const getAllProducts = async (req, res) => {
    try {
        const {search, category, sort} = req.query
        const filter = {}

        if (search) filter.name = {$regex: escapeRegex(search), $options: 'i'}
        if (category && category !== 'All Categories') filter.category = category

        let query = Product.find(filter)
        if (sort === 'price_asc') query = query.sort({price: 1})
        if (sort === 'price_desc') query = query.sort({price: -1})

        const products = await query
        return res.status(200).json({success: true, count: products.length, products})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Unable to load products'})
    }
}

const getProductById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({success: false, message: 'Invalid product ID'})
    }

    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({success: false, message: 'Product not found'})
        return res.status(200).json({success: true, product})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Unable to load product'})
    }
}

export {createProduct, getAllProducts, getProductById}
