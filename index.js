const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/errorMiddleware')
const cors = require('cors')
const useragent = require('express-useragent')

const PORT = process.env.PORT || 5000
const app = express()

connectDB()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(useragent.express())


// routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/payments', require('./routes/transRoutes'))
//app.use('/api/loan', require('./routes/loanRoutes'))

// error middleware
app.use(errorHandler)

// start the server
app.listen(PORT, () => console.log(`Server start on localhost:${PORT}`))