const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { complaintId, feedback, resolution, rating } = req.body;

    // Validation
    if (!complaintId || !feedback || !resolution || rating === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 0 and 5' });
    }

    // Create new feedback document
    const newFeedback = new Feedback({
      complaintId,
      feedback,
      resolution,
      rating
    });

    // Save to database
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Server error' });
  }
};