const express = require('express')
const router = express.Router()
//const { protect } = require('../middleware/authMiddleware')
const { getCpas, updateCpas, verifyCpas, uploadCpasProfile, getAllCpas, searchCpas, getByIdCpas } = require('../controllers/professionalCpasController')
const { protect } = require('../middleware/authMiddleware')


router.get('/getcpa', protect, getCpas)
router.get('/getallcpa', protect, getAllCpas)
router.get('/searchcpas', protect, searchCpas)
router.get('/getbyidcpa/:id', protect, getByIdCpas)
router.put('/updatecpa/:id', protect, updateCpas)
router.put('/verifycpa/:id', protect, verifyCpas)
router.put('/uploadprofilecpa/:id', protect, uploadCpasProfile)

module.exports = router