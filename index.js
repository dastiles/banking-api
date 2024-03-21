const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/errorMiddleware')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const app = express()

connectDB()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/payments', require('./routes/transRoutes'))
app.use('/api/cpas', require('./routes/professionalCpasRoutes'))
app.use('/api/leads', require('./routes/leadsRoutes'))

// error middleware
app.use(errorHandler)

// start the server
app.listen(PORT, () => console.log(`Server start on localhost:${PORT}`))