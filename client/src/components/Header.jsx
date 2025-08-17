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

  const isAdminPage = isAuthenticated && user?.role === 'admin' && (
    location.pathname === '/dashboard' || 
    location.pathname === '/manage-options' ||
    location.pathname === '/all-complaints' ||
    location.pathname === '/resolved-complaints' ||
    location.pathname === '/pending-complaints' ||
    location.pathname === '/reopen-complaints' ||
    location.pathname === '/escalated-complaints'
  );

  if (isAdminPage) {
    return null; // Don't render header for admin pages
  }

  const navigationItems = [
    { label: 'Home', path: '/', requiresAuth: false },
    { label: 'Feedback', path: '/feedback', requiresAuth: true },
    { label: 'FAQs', path: '/faqs', requiresAuth: false },
    { label: 'Contact', path: '/contact', requiresAuth: false },
    { label: 'Dashboard', path: '/dashboard', requiresAuth: true, adminOnly: true },
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
    (item) => {
      // Show public items
      if (!item.requiresAuth) return true;
      // Show authenticated items
      if (item.requiresAuth && isAuthenticated) {
        // If item is admin-only, only show for admin users
        if (item.adminOnly) {
          return user?.role === 'admin';
        }
        return true;
      }
      return false;
    }
  );

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* ✅ Logo Section */}
          <Box
            sx={{
              height: 72,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              px: 2,
              minWidth: '120px', // Reserve space for centering nav
            }}
          >
            <Box
              component="img"
              src="/assets/image3.png"
              alt="Logo"
              onClick={() => navigate('/')}
              sx={{
                height: '48px',
                width: 'auto',
                maxHeight: '48px',
                transform: 'none',
                cursor: 'pointer',
              }}
            />
          </Box>

          {/* ✅ Centered Navigation */}
          {/* ✅ Centered Desktop Navigation */}
          <Box
            sx={{
              position: 'absolute',           // ✅ nav ko screen center me fix karega
              left: '50%',                    // ✅ screen ke exact center
              transform: 'translateX(-50%)',  // ✅ us center se thoda piche laayega to fully center dikhe
              display: { xs: 'none', md: 'flex' },
              gap: 2,
            }}
          >

            {visibleNavigationItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
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

          {/* ✅ Avatar or Login */}
          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              minWidth: '120px', // Reserve space for centering nav
            }}
          >
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
