const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.post('/submit_complaint', complaintController.submitComplaint);

module.exports = router;