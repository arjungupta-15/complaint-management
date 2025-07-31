import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Fade,
  Card,
  CardContent,
  Grid,
  Rating,
  Chip,
} from '@mui/material';
import {
  RateReview,
  Star,
  Send,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Feedback = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    complaintId: '',
    rating: 0,
    feedback: '',
  });
  
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadResolvedComplaints();
  }, [isAuthenticated, navigate]);

  const loadResolvedComplaints = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      const resolvedComplaints = storedComplaints.filter(c => 
        c.status === 'resolved' && c.email === user?.email
      );
      
      setComplaints(resolvedComplaints);
    } catch (error) {
      setError('Failed to load resolved complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleComplaintSelect = (complaintId) => {
    const complaint = complaints.find(c => c.id === complaintId);
    setSelectedComplaint(complaint);
    setFormData(prev => ({ ...prev, complaintId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.complaintId || formData.rating === 0) {
      setError('Please select a complaint and provide a rating');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store feedback in localStorage
      const feedback = {
        id: 'FB' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        complaintId: formData.complaintId,
        rating: formData.rating,
        feedback: formData.feedback,
        submittedAt: new Date().toISOString(),
        userEmail: user?.email,
      };
      
      const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
      existingFeedback.push(feedback);
      localStorage.setItem('feedback', JSON.stringify(existingFeedback));
      
      setSuccess('Thank you for your feedback!');
      
      // Reset form
      setFormData({
        complaintId: '',
        rating: 0,
        feedback: '',
      });
      setSelectedComplaint(null);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (error) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getRatingLabel = (rating) => {
    const labels = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent',
    };
    return labels[rating] || '';
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Fade in timeout={800}>
        <Paper elevation={8} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <RateReview sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Provide Feedback
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Help us improve by rating your experience with resolved complaints
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : complaints.length === 0 ? (
                <Box sx={{ textAlign: 'center', p: 4 }}>
                  <CheckCircle sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Resolved Complaints
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    You don't have any resolved complaints to provide feedback for.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/dashboard')}
                    className="cursor-target"
                  >
                    View Dashboard
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl fullWidth required>
                        <InputLabel>Select Resolved Complaint</InputLabel>
                        <Select
                          value={formData.complaintId}
                          label="Select Resolved Complaint"
                          onChange={(e) => handleComplaintSelect(e.target.value)}
                          className="cursor-target"
                        >
                          {complaints.map((complaint) => (
                            <MenuItem key={complaint.id} value={complaint.id}>
                              <Box>
                                <Typography variant="body1">
                                  {complaint.id} - {complaint.department}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {complaint.category} • {new Date(complaint.createdAt).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {selectedComplaint && (
                      <Grid item xs={12}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Complaint Details
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="body2">
                                <strong>ID:</strong> {selectedComplaint.id}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Department:</strong> {selectedComplaint.department}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography variant="body2">
                                <strong>Category:</strong> {selectedComplaint.category}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Description:</strong> {selectedComplaint.description.substring(0, 100)}...
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Rate Your Experience
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Rating
                          name="rating"
                          value={formData.rating}
                          onChange={(event, newValue) => {
                            setFormData(prev => ({ ...prev, rating: newValue }));
                          }}
                          size="large"
                          className="cursor-target"
                        />
                        {formData.rating > 0 && (
                          <Chip
                            label={getRatingLabel(formData.rating)}
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Rate how satisfied you are with the resolution of your complaint
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Additional Feedback (Optional)"
                        multiline
                        rows={4}
                        value={formData.feedback}
                        onChange={(e) => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
                        placeholder="Share your thoughts about the resolution process, response time, or any suggestions for improvement..."
                        className="cursor-target"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={<Send />}
                          disabled={submitting || formData.rating === 0}
                          sx={{ px: 4, py: 1.5 }}
                          className="cursor-target"
                        >
                          {submitting ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            'Submit Feedback'
                          )}
                        </Button>
                        
                        <Button
                          variant="outlined"
                          size="large"
                          startIcon={<Cancel />}
                          onClick={() => navigate('/dashboard')}
                          className="cursor-target"
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              )}
            </CardContent>
          </Card>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Feedback; 