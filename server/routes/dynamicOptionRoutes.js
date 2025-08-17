const express = require('express');
const router = express.Router();
const dynamicOptionController = require('../controllers/dynamicOptionController');

// Create a new dynamic option
router.post('/', dynamicOptionController.createOption);

// Get all dynamic options (optionally by type)
router.get('/', dynamicOptionController.getOptions);

// Update a dynamic option by ID
router.put('/:id', dynamicOptionController.updateOption);

// Delete a dynamic option by ID
router.delete('/:id', dynamicOptionController.deleteOption);

module.exports = router;
