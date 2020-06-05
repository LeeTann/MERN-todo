const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const cookieParser = require('cookie-parser')
const connectMongoDB = require('./db/db')

const userRouter = require('./routes/User')
const todoRouter = require('./routes/Todo')

// Initialize express app
const app = express()

// Bodyparser and Cookieparser middleware
app.use(express.json())
app.use(cookieParser())

// Utitilze .env configuration
dotenv.config()

// Connect to MongoDB
connectMongoDB()

// Connect routes to app
app.use('/api', userRouter)
app.use('/api', todoRouter)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => res.status(200).json({ api: 'server up and running' }))

// Port #
const PORT = process.env.PORT || 6000

// Run Sever
app.listen(PORT, console.log(`Server running on port ${PORT} IN ${process.env.NODE_ENV} MODE`.yellow.bold))