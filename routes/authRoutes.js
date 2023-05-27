const express = require('express')
const router = express.Router()
const { openAccount, loginUser } = require('../controllers/authControllers')

router.post('/open_account', openAccount)
router.post('/login', loginUser)

module.exports = router