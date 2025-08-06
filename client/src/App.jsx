import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';

// Components
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import SubmitComplaint from './pages/SubmitComplaint';
import TrackComplaint from './pages/TrackComplaint';
import Dashboard from './pages/Dashboard';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import { AuthProvider, useAuth } from './context/AuthContext';
import FeedbackForm from './pages/FeedbackForm';
import Studentdash from './pages/Studentdash'
import AllComplaints from './pages/AllComplaints';
import ResolvedComplaints from './pages/ResolvedComplaints';
import PendingComplaints from './pages/PendingComplaints';
import ReopenedComplaints from './pages/ReopendComplaints';
import EscalatedComplaints from './pages/EscalatedComplaints';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Protected Route Component (for features that need authentication)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  useEffect(() => {
    // Custom cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    const handleMouseMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const cursorTargets = document.querySelectorAll('.cursor-target');
    cursorTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'rgba(25, 118, 210, 0.2)';
      });
      target.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'rgba(25, 118, 210, 0.1)';
      });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
      if (document.body.contains(cursorDot)) {
        document.body.removeChild(cursorDot);
      }
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ height: '100vh', backgroundColor: 'background.default', overflow: 'hidden' }}>
            <Header />
            <Box component="main" sx={{ pt: 8, pb: 4, height: 'calc(100vh - 64px)', overflow: 'auto' }}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/all-complaints" element={<AllComplaints />} />
                <Route path="/resolved-complaints" element={<ResolvedComplaints />} />
                <Route path="pending-complaints" element={<PendingComplaints/>}/>
                <Route path="reopen-complaints" element={<ReopenedComplaints/>}/>
                <Route path="escalated-complaints" element={<EscalatedComplaints/>}/>"
                
                {/* Protected Routes (need authentication) */}
                <Route path="/submit-complaint" element={
                  <ProtectedRoute>
                    <SubmitComplaint />
                  </ProtectedRoute>
                } />
                <Route path="/track-complaint" element={
                  <ProtectedRoute>
                    <TrackComplaint />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/feedback" element={
                  <ProtectedRoute>
                    <FeedbackForm />
                  </ProtectedRoute>
                } />
                <Route path="/studentdash" element={
                  <ProtectedRoute>
                    <Studentdash />
                  </ProtectedRoute>
                } />
                
                {/* Default redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
