import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Fade,
  Grow,
  Paper,
  Chip,
} from '@mui/material';
import {
  BugReport,
  Search,
  Dashboard,
  School,
  AdminPanelSettings,
  TrendingUp,
  Security,
  Speed,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [animatedText, setAnimatedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'Welcome to MaintaBIT';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setAnimatedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullText]);

  const features = [
    {
      icon: <BugReport sx={{ fontSize: 40 }} />,
      title: 'Submit Complaints',
      description: 'Easily submit your complaints with detailed information and file attachments.',
      action: 'Submit Now',
      path: '/submit-complaint',
      color: '#1976d2',
    },
    {
      icon: <Search sx={{ fontSize: 40 }} />,
      title: 'Track Status',
      description: 'Track the status of your complaints in real-time with unique tracking IDs.',
      action: 'Track Complaint',
      path: '/track-complaint',
      color: '#2e7d32',
    },
    {
      icon: <Dashboard sx={{ fontSize: 40 }} />,
      title: 'Dashboard',
      description: 'View all your complaints, manage statuses, and get detailed insights.',
      action: 'View Dashboard',
      path: '/studentdash',
      color: '#ed6c02',
    },
  ];

  const stats = [
    { label: 'Complaints Resolved', value: '1,234', icon: <TrendingUp /> },
    { label: 'Active Users', value: '5,678', icon: <School /> },
    { label: 'Response Time', value: '< 24h', icon: <Speed /> },
    { label: 'Security Level', value: 'High', icon: <Security /> },
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: 'url("/assets/image1.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 6 }}>
        {/* Hero Section */}
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #42a5f5, #90caf9)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              {animatedText}
              <span style={{ animation: 'blink 1s infinite' }}>|</span>
            </Typography>

            <Typography variant="h5" color="white" sx={{ mb: 4 }}>
              Streamlined Complaint Management System for Students and Administrators
            </Typography>

            {isAuthenticated ? (
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Chip
                  label={`Welcome, ${user?.email}`}
                  color="primary"
                  variant="outlined"
                  icon={user?.role === 'admin' ? <AdminPanelSettings /> : <School />}
                />
                <Chip
                  label={`Role: ${user?.role === 'admin' ? 'Administrator' : 'Student'}`}
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  px: 4,
                  py: 1.5,
                  backgroundColor: '#ffffff',
                  color: '#1976d2',
                  fontWeight: 'bold',
                  border: '2px solid #1976d2',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                  },
                }}
              >
                Get Started
              </Button>
            )}
          </Box>
        </Fade>

        {/* Features Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" textAlign="center" gutterBottom sx={{ color: 'white', mb: 4 }}>
            What We Offer
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
                <Grow in timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      maxWidth: 350,
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-8px)' },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, color: feature.color }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={() => navigate(feature.path)}
                        sx={{
                          fontWeight: 'bold',
                          borderRadius: 2,
                          textTransform: 'none',
                          px: 3,
                        }}
                      >
                        {feature.action}
                      </Button>
                    </CardActions>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box sx={{ mb: 6 }}>
          <Paper elevation={3} sx={{ p: 4, background: 'rgba(0, 0, 0, 0.6)', color: 'white' }}>
            <Typography variant="h4" textAlign="center" gutterBottom sx={{ mb: 4 }}>
              System Statistics
            </Typography>
            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box textAlign="center">
                    <Box sx={{ mb: 1 }}>{React.cloneElement(stat.icon, { sx: { fontSize: 40 } })}</Box>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>{stat.value}</Typography>
                    <Typography variant="body2">{stat.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 6, py: 3, textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: 2 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} MaintaBIT | Developed for Student Welfare and Complaint Resolution
          </Typography>
        </Box>
      </Container>

      {/* Typing Cursor Animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </Box>
  );
};

export default Home;
