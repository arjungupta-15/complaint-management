const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/submit_feedback', feedbackController.submitFeedback);

module.exports = router;