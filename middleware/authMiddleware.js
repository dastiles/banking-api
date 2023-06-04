const jwt = require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/authModels')

const protect = expressAsyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get the token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get the user id from the token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }

    }

    if (!token) {
        console.log(error)
        res.status(401)
        throw new Error('Not Authorized')
    }
})

module.exports = { protect }