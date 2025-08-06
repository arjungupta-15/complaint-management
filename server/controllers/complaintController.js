const Complaint = require('../models/Complaint');
const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|doc|docx|jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Unsupported file format. Allowed: PDF, DOC, DOCX, JPG, JPEG, PNG'));
  },
}).single('file');

exports.submitComplaint = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { email, department, category, subCategory, subOther, description, priority } = req.body;

      // Validation
      if (!email || !department || !category || !subCategory || !description) {
        return res.status(400).json({ error: 'All required fields must be filled' });
      }

      if (!email.match(/^\S+@\S+\.\S+$/)) {
        return res.status(400).json({ error: 'Please enter a valid email address' });
      }

      if (!['facility', 'request', 'hostel'].includes(category)) {
        return res.status(400).json({ error: 'Invalid category' });
      }

      if (!['urgent', 'high', 'medium', 'low'].includes(priority)) {
        return res.status(400).json({ error: 'Invalid priority' });
      }

      // Create new complaint document
      const newComplaint = new Complaint({
        email,
        department,
        category,
        subCategory: subCategory === 'other' ? subOther : subCategory,
        subOther,
        description,
        priority,
        filePath: req.file ? `/uploads/${req.file.filename}` : '',
      });

      // Save to database
      await newComplaint.save();

      res.status(201).json({
        message: `Complaint submitted successfully with priority: ${priority.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Error submitting complaint:', error);
      res.status(500).json({ error: 'Failed to submit complaint. Please try again.' });
    }
  });
};