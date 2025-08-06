import React, { useState, useEffect } from 'react';
import { Chip } from '@mui/material';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // Mock complaint data
  const mockComplaints = [
    {
      id: '1',
      email: 'student@college.com',
      description: 'Broken Chair in Computer Lab',
      file_upload: 'chair_photo.jpg',
      tracking_id: 'COMP001',
      created_at: '2024-01-15T10:30:00Z',
      department: 'Computer Engineering',
      priority: 'high',
      status: 'pending',
    },
    {
      id: '2',
      email: 'student@college.com',
      description: 'Air Conditioning Not Working',
      file_upload: null,
      tracking_id: 'COMP002',
      created_at: '2024-01-14T14:20:00Z',
      department: 'Mechanical Engineering',
      priority: 'medium',
      status: 'in_progress',
    },
    {
      id: '3',
      email: 'student@college.com',
      description: 'WiFi Connection Issues',
      file_upload: 'wifi_signal.jpg',
      tracking_id: 'COMP003',
      created_at: '2024-01-13T11:45:00Z',
      department: 'Electrical Engineering',
      priority: 'high',
      status: 'resolved',
    },
  ];

  // Fetch complaints
  const fetchComplaints = async () => {
    setLoading(true);
    try {
      // Simulate API call to fetch_complaints.php
      await new Promise(resolve => setTimeout(resolve, 1000));
      let filteredComplaints = mockComplaints;
      if (departmentFilter !== 'all') {
        filteredComplaints = mockComplaints.filter(complaint => complaint.department === departmentFilter);
      }
      setComplaints(filteredComplaints);
      setLoading(false);
    } catch (error) {
      setToast({ open: true, message: 'Failed to fetch complaints', severity: 'error' });
      setLoading(false);
    }
  };

  // Update complaint status
  const updateStatus = async (complaintId, status) => {
    try {
      // Simulate API call to update_complaint_status.php
      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedComplaints = complaints.map(complaint =>
        complaint.id === complaintId ? { ...complaint, status } : complaint
      );
      setComplaints(updatedComplaints);
      setToast({ open: true, message: 'Complaint status updated successfully!', severity: 'success' });
    } catch (error) {
      setToast({ open: true, message: 'Failed to update status', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [departmentFilter]);

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* All Complaints Title */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          All Complaints
        </Typography>

        {/* Department Filter */}
        <Box sx={{ mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="department-filter-label">Filter by Department</InputLabel>
            <Select
              labelId="department-filter-label"
              value={departmentFilter}
              label="Filter by Department"
              onChange={(e) => setDepartmentFilter(e.target.value)}
              sx={{ borderRadius: 1 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
              <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
              <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
              <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Complaints Table */}
        <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <CardContent>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Description</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>File Upload</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Tracking ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Created At</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Department</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Priority</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {complaints.length > 0 ? (
                      complaints.map((complaint) => (
                        <TableRow key={complaint.id} hover sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                          <TableCell sx={{ textAlign: 'center' }}>{complaint.id}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{complaint.email}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{complaint.description}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {complaint.file_upload ? (
                              <Link href={complaint.file_upload} target="_blank" underline="hover">
                                Download
                              </Link>
                            ) : (
                              'N/A'
                            )}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{complaint.tracking_id}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {new Date(complaint.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{complaint.department}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <Chip
                              label={complaint.priority.toUpperCase()}
                              color={complaint.priority === 'high' ? 'error' : complaint.priority === 'medium' ? 'warning' : 'success'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={complaint.status}
                                onChange={(e) => updateStatus(complaint.id, e.target.value)}
                                sx={{ minWidth: 120 }}
                              >
                                <MenuItem value="select">Select</MenuItem>
                                <MenuItem value="in_progress">In Progress</MenuItem>
                                <MenuItem value="resolved">Resolved</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} sx={{ textAlign: 'center', py: 3 }}>
                          No complaints found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        {/* Toast Notification */}
        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%', borderRadius: 1 }}>
            {toast.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default AllComplaints;