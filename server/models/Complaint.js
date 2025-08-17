const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  subCategory: {
    type: String,
    required: true,
    trim: true,
  },
  subOther: {
    type: String,
    trim: true,
    default: '',
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  priority: {
    type: String,
    required: true,
    trim: true,
  },
  filePath: {
    type: String,
    trim: true,
    default: '',
  },
  submittedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Complaint', complaintSchema);