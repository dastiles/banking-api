const mongoose = require('mongoose')

let url
if (process.env.NODE_ENV === 'production') {
    url = process.env.MONGO_URL_DEV
} else {
    url = process.env.MONGO_URL_PROD
}
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url)
        console.log(`MongoDb Connected : ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB