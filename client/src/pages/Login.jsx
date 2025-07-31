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
  Divider,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from '@mui/material';
import {
  Email,
  Security,
  Person,
  AdminPanelSettings,
  School,
  Login as LoginIcon,
  PersonAdd,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { generateOTP, verifyOTP, isAuthenticated, loginAdmin, signupStudent, loginStudent } = useAuth();
  
  const [mode, setMode] = useState(0); // 0: Login, 1: Signup
  const [step, setStep] = useState(1); // 1: role selection, 2: form, 3: OTP (for student login)
  const [selectedRole, setSelectedRole] = useState('');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleRoleSelection = () => {
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }
    setStep(2);
    setError('');
  };

  const handleStudentLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // First validate student credentials
      await loginStudent({ email, password });
      
      // If credentials are valid, generate OTP
      const generatedOtp = generateOTP();
      console.log('Generated OTP for student login:', generatedOtp);
      
      setCountdown(300); // 5 minutes
      setStep(3);
      setSuccess('OTP sent successfully! Check your email.');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call signup function
      signupStudent({ name, email, password });
      
      setSuccess('Account created successfully! Welcome to MaintaBIT!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call admin login function
      loginAdmin({ email, password });
      
      setSuccess('Welcome back, Admin!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isValid = verifyOTP(otp, 'student', email);
      
      if (isValid) {
        setSuccess('Welcome back to MaintaBIT!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    handleStudentLogin();
  };

  const handleModeChange = (event, newValue) => {
    setMode(newValue);
    setStep(1);
    setSelectedRole('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setOtp('');
    setError('');
    setSuccess('');
    setCountdown(0);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedRole('');
    } else if (step === 3) {
      setStep(2);
      setOtp('');
      setCountdown(0);
    }
    setError('');
    setSuccess('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSteps = () => {
    if (mode === 0) { // Login
      return selectedRole === 'student' ? ['Select Role', 'Login', 'Verify OTP'] : ['Select Role', 'Login'];
    } else { // Signup
      return ['Select Role', 'Sign Up'];
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Fade in timeout={800}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              🛠️ MaintaBIT
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Complaint Management System
            </Typography>
          </Box>

          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              {/* Mode Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs 
                  value={mode} 
                  onChange={handleModeChange} 
                  centered
                  sx={{
                    '& .MuiTab-root': {
                      color: 'text.secondary',
                      fontWeight: 500,
                    },
                    '& .Mui-selected': {
                      color: 'primary.main',
                    },
                  }}
                >
                  <Tab 
                    icon={<LoginIcon />} 
                    label="Login" 
                    iconPosition="start"
                    className="cursor-target"
                  />
                  <Tab 
                    icon={<PersonAdd />} 
                    label="Sign Up" 
                    iconPosition="start"
                    className="cursor-target"
                  />
                </Tabs>
              </Box>

              {/* Stepper */}
              <Box sx={{ mb: 3 }}>
                <Stepper activeStep={step - 1} alternativeLabel>
                  {getSteps().map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
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

              {/* Step 1: Role Selection */}
              {step === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', textAlign: 'center' }}>
                    Select Your Role
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center' }}>
                    Choose how you want to access the system
                  </Typography>

                  <FormControl fullWidth margin="normal">
                    <InputLabel>Select Role</InputLabel>
                    <Select
                      value={selectedRole}
                      label="Select Role"
                      onChange={(e) => setSelectedRole(e.target.value)}
                      startAdornment={
                        selectedRole === 'admin' ? (
                          <AdminPanelSettings sx={{ mr: 1, color: 'action.active' }} />
                        ) : (
                          <School sx={{ mr: 1, color: 'action.active' }} />
                        )
                      }
                      className="cursor-target"
                    >
                      <MenuItem value="student">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <School sx={{ mr: 1 }} />
                          Student
                        </Box>
                      </MenuItem>
                      <MenuItem value="admin">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AdminPanelSettings sx={{ mr: 1 }} />
                          Admin
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleRoleSelection}
                    disabled={!selectedRole}
                    sx={{ mt: 3, py: 1.5 }}
                    className="cursor-target"
                  >
                    Continue
                  </Button>
                </Box>
              )}

              {/* Step 2: Form */}
              {step === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                    {mode === 0 ? 'Login' : 'Create Account'} as {selectedRole === 'admin' ? 'Admin' : 'Student'}
                  </Typography>

                  {mode === 1 && selectedRole === 'student' && (
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      margin="normal"
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />,
                      }}
                      className="cursor-target"
                    />
                  )}

                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                    className="cursor-target"
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    InputProps={{
                      startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} />,
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          className="cursor-target"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                    className="cursor-target"
                  />

                  {mode === 1 && selectedRole === 'student' && (
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      margin="normal"
                      InputProps={{
                        startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} />,
                        endAdornment: (
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            className="cursor-target"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ),
                      }}
                      className="cursor-target"
                    />
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={
                      mode === 0 
                        ? (selectedRole === 'admin' ? handleAdminLogin : handleStudentLogin)
                        : handleStudentSignup
                    }
                    disabled={loading}
                    sx={{ mt: 3, py: 1.5 }}
                    className="cursor-target"
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      mode === 0 ? 'Login' : 'Create Account'
                    )}
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleBack}
                    sx={{ mt: 2 }}
                    className="cursor-target"
                  >
                    Back
                  </Button>
                </Box>
              )}

              {/* Step 3: OTP Verification (Student Login Only) */}
              {step === 3 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                    Verify OTP
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    Enter the 6-digit code sent to {email}
                  </Typography>

                  <TextField
                    fullWidth
                    label="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    margin="normal"
                    inputProps={{ maxLength: 6 }}
                    InputProps={{
                      startAdornment: <Security sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                    className="cursor-target"
                  />

                  {countdown > 0 && (
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                      OTP expires in: {formatTime(countdown)}
                    </Typography>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleVerifyOTP}
                    disabled={loading || countdown === 0}
                    sx={{ mt: 3, py: 1.5 }}
                    className="cursor-target"
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleBack}
                      className="cursor-target"
                    >
                      Back
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleResendOTP}
                      disabled={countdown > 0}
                      className="cursor-target"
                    >
                      Resend OTP
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Login; 