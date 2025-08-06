import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
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
  CircularProgress,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ResolvedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock resolved complaint data
  const mockComplaints = [
    {
      id: '3',
      email: 'student@college.com',
      description: 'WiFi Connection Issues',
      file_upload: 'wifi_signal.jpg',
      tracking_id: 'COMP003',
      created_at: '2024-01-13T11:45:00Z',
    },
    {
      id: '4',
      email: 'student@college.com',
      description: 'Projector Fixed in Room 205',
      file_upload: null,
      tracking_id: 'COMP004',
      created_at: '2024-01-10T09:30:00Z',
    },
  ];

  // Fetch resolved complaints
  const fetchResolvedComplaints = async () => {
    setLoading(true);
    try {
      console.log('Fetching resolved complaints...');
      // Simulate API call to fetch_resolved_complaints.php
      await new Promise(resolve => setTimeout(resolve, 1000));
      setComplaints(mockComplaints);
      setLoading(false);
      console.log('Resolved complaints fetched:', mockComplaints);
    } catch (error) {
      console.error('Error fetching resolved complaints:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResolvedComplaints();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header Section */}

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Resolved Complaints Title */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Resolved Complaints
        </Typography>

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
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ textAlign: 'center', py: 3 }}>
                          No resolved complaints found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ResolvedComplaints;