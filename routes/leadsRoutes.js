const express = require('express')
const router = express.Router()
//const { protect } = require('../middleware/authMiddleware')
const { getLeads, getAllLeads } = require('../controllers/leadsController')
const { protect } = require('../middleware/authMiddleware')


router.get('/getleads', protect, getLeads)
router.get('/getallleads', protect, getAllLeads)

module.exports = router


// commenting is great
