const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

router.post('/apply', protect, applyLoan)


module.exports = router
