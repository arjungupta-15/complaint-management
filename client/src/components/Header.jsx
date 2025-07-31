import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Container,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Login,
  Logout,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const navigationItems = [
    { label: 'Home', path: '/', requiresAuth: false },
    { label: 'Feedback', path: '/feedback', requiresAuth: true },
    { label: 'FAQs', path: '/faqs', requiresAuth: false },
    { label: 'Contact', path: '/contact', requiresAuth: false },
    { label: 'Dashboard', path: '/dashboard', requiresAuth: false },
  ];

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuOpen = (event) => setMobileMenuAnchor(event.currentTarget);
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const isActiveRoute = (path) => location.pathname === path;

  const visibleNavigationItems = navigationItems.filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 64, px: 2 }}>

          {/* ✅ Square, readable logo - fits red box area */}
          <Box
            component="img"
            src="/assets/image3.png"
            alt="MaintaBIT Logo"
            onClick={() => navigate('/')}
            sx={{
              height: 56,           // same as header height (adjust if needed)
              width: 56,            // square size
              objectFit: 'contain', // image scales cleanly
              cursor: 'pointer',
              mr: 2,
            }}
          />

          {/* ✅ Centered Desktop Navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {visibleNavigationItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  px: 2,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'white',
                  backgroundColor: isActiveRoute(item.path)
                    ? 'rgba(255,255,255,0.12)'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                  },
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* ✅ User Avatar / Login Button */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>
                    {user?.email?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                startIcon={<Login />}
                sx={{
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* ✅ Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleMobileMenuOpen} color="inherit" sx={{ ml: 1 }}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {visibleNavigationItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  selected={isActiveRoute(item.path)}
                >
                  {item.label}
                </MenuItem>
              ))}
              {isAuthenticated && (
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
