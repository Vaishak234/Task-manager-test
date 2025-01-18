import asyncHandler from 'express-async-handler';
import { createUser, findUserByEmail, findUserById } from '../services/userServices.js';
import bcrypt from 'bcryptjs';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
import jwt from 'jsonwebtoken';
import { userLoginSchema, userSignupSchema } from '../validations/authSchema.js';



export const signupController = asyncHandler(async (req, res) => {
    
    // validating the data using joi validation
    const {error} = userSignupSchema.validate(req.body)
    
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
     
    const { name, email, password } = req.body;
  

    const user = await findUserByEmail(email);

    if (user) {
        return res.status(400).json({ message: 'user already exist', success: false });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);

    if (!newUser) {
        return res.status(400).json({ message: 'Error in creating user', success: false });
    }

    res.status(201).json({ message: 'User created successfully', success: true });
});



export const loginController = asyncHandler(async (req, res) => {


    // validating the data using joi validation
    const { error } = userLoginSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const { email, password } = req.body;

   
    const user = await findUserByEmail(email);

    if (!user) {
        return res.status(400).json({ message: 'No user found', success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Wrong password provided', success: false });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
    };

    res.cookie('jwt', refreshToken, cookieOptions)
        .status(200).json({ message: 'User logged in successfully', success: true, data: { user: userData,accessToken} });
});

export const logoutController = asyncHandler(async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.clearCookie('jwt', cookieOptions)
        .json({ message: 'Logout successful', success: true });
});


export const refreshTokenController = asyncHandler(async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(400).json({ message: 'Unauthorized access', success: false });
    }

    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Token expired', success: false });
        }

        const user = await findUserById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: 'User is not authorized', success: false });
        }

        const accessToken = await generateAccessToken(user._id);

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            status: user.status,
        };

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };

        res.cookie('jwt', refreshToken, cookieOptions)
            .status(200).json({ message: 'User logged in successfully', success: true, data: { user: userData, accessToken } });
    });
});
