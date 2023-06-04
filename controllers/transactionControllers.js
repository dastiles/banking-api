const expressAsyncHandler = require("express-async-handler");
const Transaction = require('../models/transactionsModel')
const User = require('../models/authModels')
const bcrypt = require('bcryptjs')


const addTransaction = expressAsyncHandler(async (req, res) => {
    const { destination, location, phone, password } = req.body
    let device = `${req.useragent.browser} ${req.useragent.platform}`


    let senderPhone = req.user.phone
    const userDetails = await User.findOne({ phone: senderPhone })

    if (userDetails.blocked) {
        res.status(400)
        throw new Error('This account is blocked ')
    }
    let amount = parseInt(req.body.amount)
    if (!destination || !amount || !location || !phone || !password) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    const receiverUser = await User.findOne({ phone })


    if (!receiverUser) {
        res.status(400)
        throw new Error('Receiver Phone not registered')
    }

    if (receiverUser.phone == req.user.phone) {
        res.status(400)
        throw new Error('Same Phone Number Transfer Error')
    }

    // validate the password of the user


    if (userDetails && (await bcrypt.compare(password, userDetails.password))) {
        try {

            const sendertransaction = await Transaction.create({
                user: req.user.id,
                destination,
                amount: amount,
                location,
                phone,
                name: receiverUser.name,
                device: device,
                cash_flow: 'Sent',

            })

            const receiverTransaction = await Transaction.create({
                user: receiverUser.id,
                name: req.user.name,
                destination: location,
                location: destination,
                amount,
                phone: req.user.phone,
                device: device,
                cash_flow: 'Received'

            })
            // updating balances
            let senderBalance = Math.floor(req.user.currentBalance - amount)
            const receiverBalance = Math.floor(receiverUser.currentBalance + amount)

            const updateSenderBalance = await User.findByIdAndUpdate(req.user.id, { currentBalance: senderBalance }, { new: true })

            const updateReceiverBalance = await User.findByIdAndUpdate(receiverUser.id, { currentBalance: receiverBalance }, { new: true })

            if (sendertransaction) {
                const { destination, amount, user, location, device, cash_flow, phone } = sendertransaction
                res.status(201)
                res.json({
                    user,
                    destination,
                    amount,
                    location,
                    device,
                    cash_flow,
                    phone,
                    user_phone: req.user.phone,
                    balance: senderBalance

                })
            }
        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    } else {
        const passwordAttempts = userDetails.attempts
        if (passwordAttempts === 2) {
            const updateSenderBalance = await User.findByIdAndUpdate(req.user.id, { blocked: true }, { new: true })
            res.status(400)
            throw new Error('Your Account has been blocked')
        } else {
            const updateSenderBalance = await User.findByIdAndUpdate(req.user.id, { attempts: (passwordAttempts + 1) }, { new: true })
            res.status(400)
            throw new Error(`Wrong Password ${2 - passwordAttempts} attempt(s) left`)
        }

    }

})

const getUserTransactions = expressAsyncHandler(async (req, res) => {
    try {
        let userTransactions = await Transaction.find({ user: req.user.id })

        res.status(200)
        res.json(userTransactions)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }

})


module.exports = {
    addTransaction,
    getUserTransactions,
}