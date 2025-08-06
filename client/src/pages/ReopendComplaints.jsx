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

const ReopenedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock reopened complaint data
  const mockComplaints = [
    {
      id: '5',
      email: 'student@college.com',
      department: 'Computer Engineering',
      description: 'Software Issue in Lab PC (Reopened)',
      tracking_id: 'COMP005',
      created_at: '2024-01-16T12:00:00Z',
    },
    {
      id: '6',
      email: 'student@college.com',
      department: 'Electrical Engineering',
      description: 'Lighting Issue in Classroom (Reopened)',
      tracking_id: 'COMP006',
      created_at: '2024-01-17T09:45:00Z',
    },
  ];

  // Fetch reopened complaints
  const fetchReopenedComplaints = async () => {
    setLoading(true);
    try {
      console.log('Fetching reopened complaints for department:', departmentFilter);
      // Simulate API call to fetch_reopen_complaints.php
      await new Promise(resolve => setTimeout(resolve, 1000));
      let filteredComplaints = mockComplaints;
      if (departmentFilter !== 'all') {
        filteredComplaints = mockComplaints.filter(complaint => complaint.department === departmentFilter);
      }
      setComplaints(filteredComplaints);
      setLoading(false);
      console.log('Reopened complaints fetched:', filteredComplaints);
    } catch (error) {
      console.error('Error fetching reopened complaints:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReopenedComplaints();
  }, [departmentFilter]);

  return (
    <Box sx={{ flexGrow: 1 }}>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Reopened Complaints Title */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#2196f3', textAlign: 'center' }}>
          Reopened Complaints
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
              sx={{ borderRadius: 1, fontSize: '16px' }}
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
        <Card sx={{ width: '90%', margin: '30px auto', borderRadius: 2, boxShadow: '0 0 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
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
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#2196f3', color: '#fff' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#2196f3', color: '#fff' }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#2196f3', color: '#fff' }}>Department</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#2196f3', color: '#fff' }}>Description</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#2196f3', color: '#fff' }}>Tracking ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#2196f3', color: '#fff' }}>Created At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {complaints.length > 0 ? (
                      complaints.map((complaint) => (
                        <TableRow key={complaint.id} hover sx={{ '&:hover': { backgroundColor: '#f2f2f2' } }}>
                          <TableCell sx={{ textAlign: 'center', padding: '12px 15px', borderBottom: '1px solid #ccc' }}>{complaint.id}</TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: '12px 15px', borderBottom: '1px solid #ccc' }}>{complaint.email}</TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: '12px 15px', borderBottom: '1px solid #ccc' }}>{complaint.department}</TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: '12px 15px', borderBottom: '1px solid #ccc' }}>{complaint.description}</TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: '12px 15px', borderBottom: '1px solid #ccc' }}>{complaint.tracking_id}</TableCell>
                          <TableCell sx={{ textAlign: 'center', padding: '12px 15px', borderBottom: '1px solid #ccc' }}>
                            {new Date(complaint.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, borderBottom: '1px solid #ccc' }}>
                          No reopened complaints found.
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

export default ReopenedComplaints;