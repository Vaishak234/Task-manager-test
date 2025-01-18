import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

/**
 * Middleware to verify the JWT token from the request authorization header.
 * Ensures the token is valid and attaches the decoded user information to the request object.
 */

const verifyAuthToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers?.authorization;

    

    // Check if the authorization header exists and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token is missing or malformed', success: false });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];


    if (!token || token.trim() === "null") {
        return res.status(401).json({ message: 'Missing token', success: false });
    }

    // Verify the token using the secret key stored in environment variables
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
        if (error) {
            // Token verification failed (invalid or expired token)
            return res.status(403).json({ message: 'Token is invalid or expired', success: false });
        }

        // Attach the decoded user information to the request object
        req.userId = decoded.id;

        next();
    });
});

export default verifyAuthToken;
