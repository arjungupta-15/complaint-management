import React, { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const EscalatedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock escalated complaint data
  const mockComplaints = [
    {
      id: '7',
      email: 'student@college.com',
      department: 'Mechanical Engineering',
      description: 'Machine Failure in Workshop (Escalated)',
      tracking_id: 'COMP007',
      created_at: '2024-01-18T14:20:00Z',
    },
    {
      id: '8',
      email: 'student@college.com',
      department: 'Civil Engineering',
      description: 'Structural Issue in Building B (Escalated)',
      tracking_id: 'COMP008',
      created_at: '2024-01-19T10:10:00Z',
    },
  ];

  // Fetch escalated complaints
  const fetchEscalatedComplaints = async () => {
    setLoading(true);
    try {
      console.log('Fetching escalated complaints for department:', departmentFilter);
      // Simulate API call to fetch_escalated_complaints.php
      await new Promise(resolve => setTimeout(resolve, 1000));
      let filteredComplaints = mockComplaints;
      if (departmentFilter !== 'all') {
        filteredComplaints = mockComplaints.filter(complaint => complaint.department === departmentFilter);
      }
      setComplaints(filteredComplaints);
      setLoading(false);
      console.log('Escalated complaints fetched:', filteredComplaints);
    } catch (error) {
      console.error('Error fetching escalated complaints:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEscalatedComplaints();
  }, [departmentFilter]);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      {/* Header Section */}

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Escalated Complaints Title */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#2196f3', textAlign: 'center', my: 3 }}>
          Escalated Complaints
        </Typography>

        {/* Department Filter */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="department-filter-label">Filter by Department</InputLabel>
            <Select
              labelId="department-filter-label"
              value={departmentFilter}
              label="Filter by Department"
              onChange={(e) => setDepartmentFilter(e.target.value)}
              sx={{ borderRadius: 1, fontSize: '16px', p: '8px 12px' }}
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
        <Card sx={{ width: '90%', margin: '0 auto', borderRadius: 2, boxShadow: '0 0 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
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
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#2196f3', color: '#fff', border: '1px solid #ccc', p: '12px 15px' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#2196f3', color: '#fff', border: '1px solid #ccc', p: '12px 15px' }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#2196f3', color: '#fff', border: '1px solid #ccc', p: '12px 15px' }}>Department</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#2196f3', color: '#fff', border: '1px solid #ccc', p: '12px 15px' }}>Description</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#2196f3', color: '#fff', border: '1px solid #ccc', p: '12px 15px' }}>Tracking ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#2196f3', color: '#fff', border: '1px solid #ccc', p: '12px 15px' }}>Created At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {complaints.length > 0 ? (
                      complaints.map((complaint, index) => (
                        <TableRow key={complaint.id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                          <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc', p: '12px 15px' }}>{complaint.id}</TableCell>
                          <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc', p: '12px 15px' }}>{complaint.email}</TableCell>
                          <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc', p: '12px 15px' }}>{complaint.department}</TableCell>
                          <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc', p: '12px 15px' }}>{complaint.description}</TableCell>
                          <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc', p: '12px 15px' }}>{complaint.tracking_id}</TableCell>
                          <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc', p: '12px 15px' }}>
                            {new Date(complaint.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, border: '1px solid #ccc' }}>
                          No escalated complaints found.
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

export default EscalatedComplaints;