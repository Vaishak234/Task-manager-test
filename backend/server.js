// third -partyy imports

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

// local imports
import errorHandler from './middlewares/errorHandler.js'
import connectDb from './config/connection.js'


// import route handlers
import authRoute from './routes/authRoutes.js'
import taskRoute from './routes/taskRoutes.js'
import limiter from './middlewares/limitter.js'

// configuring dotenv file
dotenv.config()


const app = express()

/**
 * The port number on which the server will listen.
 * Defaults to 4000 if process.env.PORT is not defined.
 * 
 */
const PORT = 4000 || process.env.PORT

// cors setting for creoss origin request
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow the required methods
    credentials: true,  // Allow cookies (if needed)
}));


app.use(express.json())

app.use(cookieParser())
app.use(morgan('dev'))

// rate limitter
app.use(limiter)

// database connection
connectDb()

// route handlers
app.use('/api/auth', authRoute)
app.use('/api/task', taskRoute)


// error handler middleware
app.use(errorHandler)


app.listen(PORT, () => console.log(`server is running on port : ${PORT}`))