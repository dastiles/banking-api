const mongoose = require('mongoose')

const transactionsModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    destination: {
        type: String,
        required: [true, 'destination cannot be empty']
    },
    phone: {
        type: String,
        required: [true, 'Phone number cannot be empty']
    },
    amount: {
        type: Number,
        required: [true, 'amount cannot be empty']
    },
    device: {
        type: String,
    }
    ,
    location: {
        type: String,
        required: [true, 'location cannot be empty']
    }
    ,
    cash_flow: {
        type: String,
        required: [true, 'Cash flow cannot be empty']
    },

},
    {
        timestamps: true
    })


module.exports = mongoose.model("Transaction", transactionsModel)