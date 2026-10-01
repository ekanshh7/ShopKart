import mongoose from 'mongoose'
import Product from './models/product.model.js'
import dotenv from 'dotenv'

dotenv.config()

const sampleProducts = [
  {
    name: "Noise Cancelling Headphones",
    description: "Wireless over-ear headphones with active noise cancellation.",
    price: 4999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 25
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches.",
    price: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    stock: 10
  },
  {
    name: "Classic Denim Jacket",
    description: "Stylish slim-fit denim jacket for everyday wear.",
    price: 1999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
    stock: 15
  },
  {
    name: "Atomic Habits",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
    price: 499,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    stock: 40
  },
  {
    name: "Ceramic Coffee Mug",
    description: "Minimalist 350ml ceramic mug for hot beverages.",
    price: 299,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500",
    stock: 50
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.URL)
    await Product.deleteMany({})
    await Product.insertMany(sampleProducts)
    console.log('Database Seeded Successfully!')
  } catch (error) {
    console.error('Error Seeding Database:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
};

seedDB();