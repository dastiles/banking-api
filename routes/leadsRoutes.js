const express = require('express')
const router = express.Router()
//const { protect } = require('../middleware/authMiddleware')
const { getLeads, getAllLeads, getLeadsById, getLeadById } = require('../controllers/leadsController')
const { protect } = require('../middleware/authMiddleware')


router.get('/getleads', protect, getLeads)
router.get('/getallleads', protect, getAllLeads)
router.get('/getleadsbyid', protect, getLeadsById)
router.get('/getleadbyid/:id', protect, getLeadById)

module.exports = router


// commenting is great
