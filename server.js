const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectMongoDB = require('./db/db')

// Initialize express app
const app = express()

// Bodyparser middleware
app.use(express.json())

// .env config
dotenv.config()

// Connect to MongoDB
connectMongoDB()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => res.status(200).json({ api: 'server up and running' }))

// Grab the port
const PORT = process.env.PORT || 6000

// Run Sever
app.listen(PORT, console.log(`Server running on port ${PORT} IN ${process.env.NODE_ENV} MODE`.yellow.bold))