import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';

// Components
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import SubmitComplaint from './pages/SubmitComplaint';
import TrackComplaint from './pages/TrackComplaint';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './components/AdminLayout';
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
import ManageOptions from './pages/ManageOptions';

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

// Conditional Header Component
const ConditionalHeader = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  
  const isAdminPage = isAuthenticated && user?.role === 'admin' && (
    location.pathname === '/dashboard' || 
    location.pathname === '/manage-options' ||
    location.pathname === '/all-complaints' ||
    location.pathname === '/resolved-complaints' ||
    location.pathname === '/pending-complaints' ||
    location.pathname === '/reopen-complaints' ||
    location.pathname === '/escalated-complaints'
  );

  return isAdminPage ? null : <Header />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ height: '100vh', backgroundColor: 'background.default', overflow: 'hidden' }}>
          <Box component="main" sx={{ pt: 8, pb: 4, height: 'calc(100vh - 64px)', overflow: 'auto' }}>
            <ConditionalHeader />

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
              <Route path="escalated-complaints" element={<EscalatedComplaints/>}/>
              
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
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
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
              <Route path="/manage-options" element={
                <ProtectedRoute>
                  <ManageOptions />
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
