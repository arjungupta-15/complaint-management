const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.post('/submit_complaint', complaintController.submitComplaint);
router.get('/complaints/:id', complaintController.getComplaintById);
router.get('/complaints', complaintController.getAllComplaints);
router.put('/complaints/:id/status', complaintController.updateComplaintStatus);
// New routes for student dashboard
router.get('/complaints-by-email', complaintController.getComplaintsByEmail);
router.get('/complaint/by-tracking/:trackingId', complaintController.getComplaintByTrackingId);

module.exports = router;