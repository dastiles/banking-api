const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
        },

        gender: {
            type: String,
            required: [true, 'Please add gender'],
        },
        address: {
            type: String,
            required: [true, 'Please add your address']
        }
        ,
        password: {
            type: String,
            required: [true, 'Please add password']
        }
        ,
        currentBalance: {
            type: Number,
        }
        ,
        newBalance: {
            type: Number,
        },
        phone: {
            type: String,
            required: [true, 'Account is required'],
            unique: true
        },
        blocked: {
            type: Boolean,
            required: [true, 'Please fill in field']
        }
        ,
        attempts: {
            type: Number,
            required: [true, 'Attempts can be empty']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)