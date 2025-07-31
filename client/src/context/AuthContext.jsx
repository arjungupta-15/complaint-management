import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [otpData, setOtpData] = useState(null);

  // Check if user is already logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isAuthenticated');
    
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    } else {
      // Auto-login with mock student for demo
      const mockStudent = {
        email: 'student@college.com',
        role: 'student',
        name: 'Demo Student',
        loginTime: Date.now()
      };
      setUser(mockStudent);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockStudent));
      localStorage.setItem('isAuthenticated', 'true');
    }
  }, []);

  // Mock encryption function
  const encryptData = (data) => {
    return btoa(JSON.stringify(data)); // Simple base64 encoding for demo
  };

  // Mock decryption function
  const decryptData = (encryptedData) => {
    try {
      return JSON.parse(atob(encryptedData));
    } catch (error) {
      return null;
    }
  };

  // Generate OTP
  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes
    
    const otpInfo = {
      otp,
      email: user?.email || '',
      role: 'student',
      expiryTime,
      encrypted: encryptData({ otp, expiryTime })
    };
    
    setOtpData(otpInfo);
    localStorage.setItem('otpData', JSON.stringify(otpInfo));
    
    return otp;
  };

  // Verify OTP
  const verifyOTP = (inputOtp, role, email) => {
    const savedOtpData = localStorage.getItem('otpData');
    if (!savedOtpData) return false;

    const otpInfo = JSON.parse(savedOtpData);
    
    // Check if OTP is expired
    if (Date.now() > otpInfo.expiryTime) {
      localStorage.removeItem('otpData');
      return false;
    }

    // Check if OTP matches
    if (otpInfo.otp === inputOtp && otpInfo.email === email) {
      // Create user session
      const userInfo = {
        email,
        role,
        name: email.split('@')[0], // Use email prefix as name for demo
        loginTime: Date.now()
      };

      setUser(userInfo);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.removeItem('otpData');
      
      return true;
    }

    return false;
  };

  // Admin login function
  const loginAdmin = ({ email, password }) => {
    // Mock admin credentials (in real app, this would be validated against database)
    const adminCredentials = {
      'admin@maintabit.com': 'admin123',
      'admin@college.com': 'admin123'
    };

    if (adminCredentials[email] && adminCredentials[email] === password) {
      const userInfo = {
        email,
        role: 'admin',
        name: 'Administrator',
        loginTime: Date.now()
      };

      setUser(userInfo);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('isAuthenticated', 'true');
      
      return true;
    } else {
      throw new Error('Invalid admin credentials');
    }
  };

  // Student signup function
  const signupStudent = ({ name, email, password }) => {
    // Mock user storage (in real app, this would be saved to database)
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (existingUsers.find(user => user.email === email)) {
      throw new Error('User already exists');
    }

    // Create new user
    const newUser = {
      name,
      email,
      password: encryptData(password), // Encrypt password
      role: 'student',
      createdAt: Date.now()
    };

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Auto login after signup
    const userInfo = {
      email,
      role: 'student',
      name,
      loginTime: Date.now()
    };

    setUser(userInfo);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('isAuthenticated', 'true');
    
    return true;
  };

  // Student login function (for OTP verification)
  const loginStudent = ({ email, password }) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = existingUsers.find(u => u.email === email);
    
    if (user && decryptData(user.password) === password) {
      // Store email for OTP verification
      setUser({ email, role: 'student' });
      return true;
    } else {
      throw new Error('Invalid student credentials');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setOtpData(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('otpData');
  };

  const value = {
    isAuthenticated,
    user,
    generateOTP,
    verifyOTP,
    loginAdmin,
    signupStudent,
    loginStudent,
    logout,
    encryptData,
    decryptData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 