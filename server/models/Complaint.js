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
  // Generated tracking identifier: 4649 + departmentCode + sequence
  trackingId: {
    type: String,
    required: true,
    trim: true,
  },
  // Workflow status for admin dashboard and tracking
  status: {
    type: String,
    default: 'pending',
    trim: true,
  },
  submittedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  resolvedAt: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);