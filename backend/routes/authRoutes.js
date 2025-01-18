import express from 'express';
import { 
    loginController, 
    logoutController, 
    refreshTokenController, 
    signupController 
} from '../controllers/authControllers.js';

const router = express.Router();

// Route for user registration
// This route handles user signup requests
router.post('/register', signupController);

// Route for user login
// This route handles user login requests
router.post('/login', loginController);

// Route for refreshing tokens
// This route handles requests to refresh authentication tokens
router.get('/refresh', refreshTokenController);

// Route for user logout
// This route handles user logout requests
router.get('/logout', logoutController);

export default router;