const express = require('express')
const router = express.Router()
const { openCpaAccount, openClientAccount, loginUser } = require('../controllers/authControllers')

router.post('/open_account', openCpaAccount)
router.post('/openclient', openClientAccount)
router.post('/login', loginUser)

module.exports = router