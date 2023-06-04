const express = require('express')
const router = express.Router()
const { addTransaction, getUserTransactions } = require('../controllers/transactionControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/sent', protect, addTransaction)
router.get('/transactions', protect, getUserTransactions)

module.exports = router