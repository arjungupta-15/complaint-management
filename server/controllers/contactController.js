const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message, userId } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    // Create new contact document
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      userId: userId || 'anonymous',
      submittedAt: new Date(),
    });

    // Save to database
    await newContact.save();

    res.status(201).json({ message: 'Thank you for your message! We\'ll get back to you within 24 hours.' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
};