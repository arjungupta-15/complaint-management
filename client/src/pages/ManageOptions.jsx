import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Button, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, Alert,
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  Chip, Card, CardContent, Grid, Paper
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  Category, Business, Settings
} from '@mui/icons-material';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const ManageOptions = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [currentOption, setCurrentOption] = useState(null); // For editing
  const [optionType, setOptionType] = useState('');
  const [optionValue, setOptionValue] = useState('');
  const [parentCategory, setParentCategory] = useState(''); // For subCategory

  const optionTypes = ['category', 'subCategory', 'facilityType', 'department'];

  const fetchOptions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/dynamic-options');
      setOptions(response.data);
    } catch (err) {
      setError('Failed to fetch options.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleOpenAddDialog = () => {
    setCurrentOption(null);
    setOptionType('');
    setOptionValue('');
    setParentCategory('');
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (option) => {
    setCurrentOption(option);
    setOptionType(option.type);
    setOptionValue(option.value);
    setParentCategory(option.parentCategory || '');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError('');
    setSuccess('');
  };

  const handleSubmitOption = async () => {
    setError('');
    setSuccess('');

    if (!optionType || !optionValue) {
      setError('Please select type and enter value.');
      return;
    }

    if (optionType === 'subCategory' && !parentCategory) {
      setError('Please select a parent category for sub-category.');
      return;
    }

    try {
      if (currentOption) {
        // Update existing option
        const updatedOption = { type: optionType, value: optionValue };
        if (optionType === 'subCategory') updatedOption.parentCategory = parentCategory;
        await axios.put(`http://localhost:5000/api/dynamic-options/${currentOption._id}`, updatedOption);
        setSuccess('Option updated successfully!');
      } else {
        // Add new option
        const newOption = { type: optionType, value: optionValue };
        if (optionType === 'subCategory') newOption.parentCategory = parentCategory;
        await axios.post('http://localhost:5000/api/dynamic-options', newOption);
        setSuccess('Option added successfully!');
      }
      fetchOptions();
      handleCloseDialog();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save option.');
    }
  };

  const handleDeleteOption = async (id) => {
    if (window.confirm('Are you sure you want to delete this option?')) {
      try {
        await axios.delete(`http://localhost:5000/api/dynamic-options/${id}`);
        setSuccess('Option deleted successfully!');
        fetchOptions();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete option.');
      }
    }
  };

  const getOptionsByType = (type) => {
    return options.filter(option => option.type === type);
  };

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
          Manage Dynamic Options
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          sx={{ mb: 4, px: 3, py: 1.5, borderRadius: 2 }}
        >
          Add New Option
        </Button>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography>Loading options...</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {optionTypes.map(type => (
              <Grid item xs={12} md={6} key={type}>
                <Card sx={{ height: '100%', boxShadow: 3 }}>
                  <CardContent>
                                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                       {type === 'category' && <Category sx={{ mr: 1, color: 'primary.main' }} />}
                       {type === 'department' && <Business sx={{ mr: 1, color: 'primary.main' }} />}
                       {type === 'subCategory' && <Settings sx={{ mr: 1, color: 'primary.main' }} />}
                       {type === 'facilityType' && <Settings sx={{ mr: 1, color: 'primary.main' }} />}
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}s
                      </Typography>
                    </Box>
                    
                    <Paper sx={{ maxHeight: 300, overflow: 'auto' }}>
                      {getOptionsByType(type).length === 0 ? (
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            No {type}s added yet.
                          </Typography>
                        </Box>
                      ) : (
                        <List dense>
                          {getOptionsByType(type).map(option => (
                            <ListItem 
                              key={option._id} 
                              sx={{ 
                                border: '1px solid #eee', 
                                borderRadius: 1, 
                                mb: 1,
                                '&:hover': { backgroundColor: 'action.hover' }
                              }}
                            >
                              <ListItemText 
                                primary={option.value}
                                secondary={option.parentCategory ? `Parent: ${option.parentCategory}` : null}
                              />
                              <ListItemSecondaryAction>
                                <IconButton 
                                  edge="end" 
                                  aria-label="edit" 
                                  onClick={() => handleOpenEditDialog(option)}
                                  sx={{ mr: 1 }}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton 
                                  edge="end" 
                                  aria-label="delete" 
                                  onClick={() => handleDeleteOption(option._id)}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{currentOption ? 'Edit Option' : 'Add New Option'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Option Type</InputLabel>
            <Select
              value={optionType}
              onChange={(e) => setOptionType(e.target.value)}
              label="Option Type"
              disabled={!!currentOption} // Disable type change when editing
            >
              {optionTypes.map(type => (
                <MenuItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {optionType === 'subCategory' && (
            <FormControl fullWidth margin="dense">
              <InputLabel>Parent Category</InputLabel>
              <Select
                value={parentCategory}
                onChange={(e) => setParentCategory(e.target.value)}
                label="Parent Category"
              >
                {getOptionsByType('category').map(cat => (
                  <MenuItem key={cat._id} value={cat.value}>{cat.value}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            autoFocus
            margin="dense"
            label="Option Value"
            type="text"
            fullWidth
            value={optionValue}
            onChange={(e) => setOptionValue(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitOption} variant="contained" color="primary">
            {currentOption ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default ManageOptions;
