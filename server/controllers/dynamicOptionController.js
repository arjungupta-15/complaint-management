const DynamicOption = require('../models/DynamicOption');

// Create a new dynamic option
exports.createOption = async (req, res) => {
  try {
    const { type, value, parentCategory } = req.body;
    const newOption = new DynamicOption({ type, value, parentCategory });
    await newOption.save();
    res.status(201).json(newOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all dynamic options, optionally filtered by type
exports.getOptions = async (req, res) => {
  try {
    const query = {};
    
    // Filter by type if provided
    if (req.query.type) {
      query.type = req.query.type;
    }
    
    // Filter by parentCategory if type is subCategory and parentCategory is provided
    if (req.query.type === 'subCategory' && req.query.parentCategory) {
      query.parentCategory = req.query.parentCategory;
    }
    
    const options = await DynamicOption.find(query);
    res.status(200).json(options);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a dynamic option
exports.updateOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, value, isActive, parentCategory } = req.body;
    const updatedOption = await DynamicOption.findByIdAndUpdate(
      id,
      { type, value, isActive, parentCategory },
      { new: true, runValidators: true }
    );
    if (!updatedOption) {
      return res.status(404).json({ message: 'Option not found' });
    }
    res.status(200).json(updatedOption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a dynamic option
exports.deleteOption = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOption = await DynamicOption.findByIdAndDelete(id);
    if (!deletedOption) {
      return res.status(404).json({ message: 'Option not found' });
    }
    res.status(200).json({ message: 'Option deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
