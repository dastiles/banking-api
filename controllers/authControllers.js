const expressAsyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/authModels')
const jwt = require('jsonwebtoken')




// @desc Open new for a user
// @route POST /api/auth/open_account
// @access Public

const openAccount = expressAsyncHandler(async (req, res) => {
    const { name, email, password, phone, address, gender } = req.body



    if (!name || !email || !password || !phone || !address || !gender) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if the user already exists
    const userExits = await User.findOne({ phone })
    console.log(userExits)
    if (userExits) {
        res.status(400)
        throw new Error('Phone number already registered')
    }
    // harsh the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    const user = await User.create({
        name,
        address,
        email,
        phone,
        gender,
        password: hashedPassword,
        currentBalance: 0,
        newBalance: 0,
        attempts: 0,
        blocked: false,
    })

    if (user) {
        const { id, name, address, email, phone, password, currentBalance, newBalance } = user
        console.log(id)
        res.status(201).json({
            id,
            name,
            address,
            email,
            phone,
            token: generateToken(id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }


})

const loginUser = expressAsyncHandler(async (req, res) => {
    const { phone, password } = req.body

    if (!phone || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if the user already exists
    const userExits = await User.findOne({ phone })

    if (userExits && (await bcrypt.compare(password, userExits.password))) {
        const { id, name, address, email, phone, password, currentBalance, newBalance, account } = userExits
        res.status(200).json({
            id,
            name,
            address,
            email,
            phone,
            account,
            token: generateToken(id)
        })
    } else {
        res.status(400)
        throw new Error('Account not found')
    }

})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d', })
}


module.exports = {
    openAccount,
    loginUser,
}