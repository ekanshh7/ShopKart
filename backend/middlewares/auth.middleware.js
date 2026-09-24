import jwt from "jsonwebtoken";
import Customer from "../models/customer.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        const bearerToken = authorization && authorization.startsWith("Bearer ")
            ? authorization.substring(7)
            : null;
        const token = req.cookies?.token || bearerToken;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const customer = await Customer.findById(decoded.id);

        if (!customer) {
            return res.status(401).json({
                message: "Customer not found"
            });
        }

        req.user = customer;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

export default authMiddleware;