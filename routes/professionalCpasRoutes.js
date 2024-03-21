const express = require('express')
const router = express.Router()
//const { protect } = require('../middleware/authMiddleware')
const { getCpas } = require('../controllers/professionalCpasController')
const { protect } = require('../middleware/authMiddleware')


router.get('/getcpa', protect, getCpas)

module.exports = router