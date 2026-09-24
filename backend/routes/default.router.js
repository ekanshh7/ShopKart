import express from "express";
import customersRoutes from "./customer.routes.js"


const router = express.Router()


router.use('/customers',customersRoutes)

export default router