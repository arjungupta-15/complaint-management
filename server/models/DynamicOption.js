const mongoose = require('mongoose');

const DynamicOptionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['category', 'facilityType', 'department', 'subCategory', 'other'],
  },
  value: {
    type: String,
    required: true,
    // Removed unique constraint to allow same values for different parent categories
  },
  // Optional code for departments (used for tracking ID generation)
  code: {
    type: String,
    required: false,
  },
  parentCategory: {
    type: String,
    required: false, // Only required for subCategory type
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add compound index to ensure uniqueness only within the same type and parentCategory
DynamicOptionSchema.index({ type: 1, value: 1, parentCategory: 1 }, { unique: true });

module.exports = mongoose.model('DynamicOption', DynamicOptionSchema);
