import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  TextField,
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Fade,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  BugReport,
  Search,
  FilterList,
  Edit,
  CheckCircle,
  Schedule,
  Error,
  AdminPanelSettings,
  School,
  TrendingUp,
  Assignment,
  Done,
  Pending,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // Import axios
import AdminLayout from '../components/AdminLayout';

const Dashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });

  // Removed Mock complaint data
  // const mockComplaints = [...];

  // Mock notification data (will update later if needed)
  const mockNotifications = [
    {
      complaint_id: 'COMP001',
      email: 'student@college.com',
      action: 'new',
      message: 'New complaint submitted: Broken Chair in Computer Lab',
    },
    {
      complaint_id: 'COMP002',
      email: 'student@college.com',
      action: 'in_progress',
      message: 'Complaint updated: Air Conditioning Not Working',
    },
    {
      complaint_id: 'COMP003',
      email: 'student@college.com',
      action: 'resolved',
      message: 'Complaint resolved: WiFi Connection Issues',
    },
  ];

  // Fetch all complaints
  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/complaints');
      setComplaints(response.data);
      // Update dashboard stats based on fetched complaints
      const total = response.data.length;
      const resolved = response.data.filter(c => c.status === 'resolved').length;
      const pending = response.data.filter(c => c.status === 'pending').length;
      const inProgress = response.data.filter(c => c.status === 'in_progress').length;
      setDashboardData({ total, resolved, pending, inProgress });
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
      setAlertMessage({ type: 'error', message: 'Failed to load complaints.' });
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      // For now, using mock notifications. Integrate with backend later if notifications API is available.
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchNotifications();

    const interval = setInterval(() => {
      fetchComplaints();
      fetchNotifications();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = complaints;

    if (user?.role === 'student') {
      filtered = filtered.filter(complaint => complaint.email === user.email);
    }

    if (searchTerm) {
      filtered = filtered.filter(complaint =>
        complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.priority === priorityFilter);
    }

    setFilteredComplaints(filtered);
  }, [complaints, searchTerm, statusFilter, priorityFilter, user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in_progress': return 'info';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return <BugReport />;
      case 'high': return <Error />;
      case 'medium': return <Schedule />;
      case 'low': return <CheckCircle />;
      default: return <Assignment />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'new': return 'primary';
      case 'in_progress': return 'info';
      case 'resolved': return 'success';
      default: return 'default';
    }
  };

  const handleStatusUpdate = async () => {
    if (!newStatus) return;

    setUpdateLoading(true);
    setAlertMessage({ type: '', message: '' });
    try {
      const response = await axios.put(`http://localhost:5000/api/complaints/${selectedComplaint._id}/status`, {
        status: newStatus,
      });
      
      setComplaints(prevComplaints =>
        prevComplaints.map(complaint =>
          complaint._id === response.data._id ? response.data : complaint
        )
      );
      setAlertMessage({ type: 'success', message: 'Complaint status updated successfully!' });
      setUpdateDialogOpen(false);
      setSelectedComplaint(null);
      setNewStatus('');
    } catch (error) {
      console.error('Failed to update status:', error);
      setAlertMessage({ type: 'error', message: error.response?.data?.message || 'Failed to update status.' });
    } finally {
      setUpdateLoading(false);
      setTimeout(() => setAlertMessage({ type: '', message: '' }), 5000);
    }
  };

  const getStatistics = () => {
    const userComplaints = user?.role === 'student' 
      ? complaints.filter(c => c.email === user.email) // Filter by user email
      : complaints;

    return {
      total: userComplaints.length,
      pending: userComplaints.filter(c => c.status === 'pending').length,
      inProgress: userComplaints.filter(c => c.status === 'in_progress').length,
      resolved: userComplaints.filter(c => c.status === 'resolved').length,
    };
  };

  const stats = getStatistics();

  const filterNotifications = (type) => {
    const filtered = notifications.filter(n => n.action === type);
    return filtered;
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Fade in timeout={800}>
          <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                {user?.role === 'admin' ? (
                  <AdminPanelSettings color="primary" />
                ) : (
                  <School color="primary" />
                )}
                <Typography variant="h6" color="text.secondary">
                  Welcome, {user?.name || 'User'} ({user?.role === 'admin' ? 'Administrator' : 'Student'})
                </Typography>
              </Box>
            </Box>

            {alertMessage.message && (
              <Alert severity={alertMessage.type} sx={{ mb: 3 }}>
                {alertMessage.message}
              </Alert>
            )}

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" component="div">
                          {dashboardData.total}
                        </Typography>
                        <Typography variant="body2">
                          Total Complaints
                        </Typography>
                      </Box>
                      <Assignment sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ background: 'linear-gradient(135deg, #0d47a1 0%, #764ba2 100%)', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" component="div">
                          {dashboardData.inProgress} {/* Changed to inProgress */}
                        </Typography>
                        <Typography variant="body2">
                          In Progress
                        </Typography>
                      </Box>
                      <Assignment sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" component="div">
                          {dashboardData.pending}
                        </Typography>
                        <Typography variant="body2">
                          Pending
                        </Typography>
                      </Box>
                      <Pending sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" component="div">
                          {dashboardData.resolved}
                        </Typography>
                        <Typography variant="body2">
                          Resolved
                        </Typography>
                      </Box>
                      <Done sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Search Complaints"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
                      }}
                      className="cursor-target"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={statusFilter}
                        label="Status"
                        onChange={(e) => setStatusFilter(e.target.value)}
                        startAdornment={<FilterList sx={{ mr: 1, color: 'action.active' }} />}
                        className="cursor-target"
                      >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="in_progress">In Progress</MenuItem>
                        <MenuItem value="resolved">Resolved</MenuItem>
                        <MenuItem value="closed">Closed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Priority</InputLabel>
                      <Select
                        value={priorityFilter}
                        label="Priority"
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        startAdornment={<FilterList sx={{ mr: 1, color: 'action.active' }} />}
                        className="cursor-target"
                      >
                        <MenuItem value="all">All Priorities</MenuItem>
                        <MenuItem value="urgent">Urgent</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('all');
                        setPriorityFilter('all');
                      }}
                      className="cursor-target"
                    >
                      Clear Filters
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Complaints Table */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Complaints ({filteredComplaints.length})
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Category</TableCell> {/* Removed Title column */}
                        <TableCell>Department</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Submitted By</TableCell> {/* Changed to Submitted By */}
                        <TableCell>Submitted At</TableCell> {/* Changed to Submitted At */}
                        {user?.role === 'admin' && <TableCell>Actions</TableCell>}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredComplaints.length === 0 && !loading ? (
                        <TableRow>
                          <TableCell colSpan={user?.role === 'admin' ? 8 : 7} align="center">
                            No complaints found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredComplaints.map((complaint) => (
                          <TableRow key={complaint._id} hover>
                            <TableCell>
                              <Typography variant="body2" fontWeight="bold">
                                {complaint._id}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip label={complaint.category} size="small" />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                {complaint.department}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={getPriorityIcon(complaint.priority || 'medium')}
                                label={(complaint.priority || 'medium').toUpperCase()}
                                color={getPriorityColor(complaint.priority || 'medium')}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={complaint.status ? complaint.status.replace('_', ' ').toUpperCase() : 'PENDING'}
                                color={getStatusColor(complaint.status || 'pending')}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {complaint.email || 'N/A'}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {complaint.submittedAt ? new Date(complaint.submittedAt).toLocaleDateString() : 'N/A'}
                              </Typography>
                            </TableCell>
                            {user?.role === 'admin' && (
                              <TableCell>
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setSelectedComplaint(complaint);
                                    setNewStatus(complaint.status);
                                    setUpdateDialogOpen(true);
                                  }}
                                  className="cursor-target"
                                >
                                  <Edit />
                                </IconButton>
                              </TableCell>
                            )}
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

                         {/* Quick Actions Section */}
             <Card sx={{ mt: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
               <CardContent>
                 <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
                   Quick Actions
                 </Typography>
                 <Grid container spacing={2}>
                   <Grid item xs={12} sm={6} md={3}>
                     <Button 
                       variant="contained" 
                       component={Link} 
                       to="/all-complaints" 
                       fullWidth
                       sx={{ 
                         borderRadius: 2, 
                         textTransform: 'none',
                         py: 2,
                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                       }}
                     >
                       View All Complaints
                     </Button>
                   </Grid>
                   <Grid item xs={12} sm={6} md={3}>
                     <Button 
                       variant="contained" 
                       component={Link} 
                       to="/pending-complaints" 
                       fullWidth
                       sx={{ 
                         borderRadius: 2, 
                         textTransform: 'none',
                         py: 2,
                         background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                       }}
                     >
                       Pending Complaints
                     </Button>
                   </Grid>
                   <Grid item xs={12} sm={6} md={3}>
                     <Button 
                       variant="contained" 
                       component={Link} 
                       to="/resolved-complaints" 
                       fullWidth
                       sx={{ 
                         borderRadius: 2, 
                         textTransform: 'none',
                         py: 2,
                         background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                       }}
                     >
                       Resolved Complaints
                     </Button>
                   </Grid>
                   <Grid item xs={12} sm={6} md={3}>
                     <Button 
                       variant="contained" 
                       component={Link} 
                       to="/manage-options" 
                       fullWidth
                       sx={{ 
                         borderRadius: 2, 
                         textTransform: 'none',
                         py: 2,
                         background: 'linear-gradient(135deg, #0d47a1 0%, #764ba2 100%)'
                       }}
                     >
                       Manage Options
                     </Button>
                   </Grid>
                 </Grid>
               </CardContent>
             </Card>

            {/* Update Status Dialog */}
            <Dialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)}>
              <DialogTitle>Update Complaint Status</DialogTitle>
              <DialogContent>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Complaint: {selectedComplaint?.description}
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>New Status</InputLabel>
                  <Select
                    value={newStatus}
                    label="New Status"
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="cursor-target"
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                    <MenuItem value="reopened">Reopened</MenuItem> {/* Added Reopened */}
                    <MenuItem value="escalated">Escalated</MenuItem> {/* Added Escalated */}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setUpdateDialogOpen(false)}>Cancel</Button>
                <Button
                  onClick={handleStatusUpdate}
                  variant="contained"
                  disabled={updateLoading}
                  className="cursor-target"
                >
                  {updateLoading ? <CircularProgress size={20} /> : 'Update'}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Fade>
      </Box>
    </AdminLayout>
  );
};

export default Dashboard;