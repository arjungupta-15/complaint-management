import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Dashboard,
  Settings,
  ListAlt,
  CheckCircle,
  Pending,
  Refresh,
  TrendingUp,
  Logout,
  Menu as MenuIcon,
  AdminPanelSettings,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 280;

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/dashboard',
      tab: 'dashboard',
    },
    {
      text: 'Manage Options',
      icon: <Settings />,
      path: '/dashboard',
      tab: 'manage-options',
    },
    {
      text: 'All Complaints',
      icon: <ListAlt />,
      path: '/dashboard',
      tab: 'all-complaints',
    },
    {
      text: 'Resolved Complaints',
      icon: <CheckCircle />,
      path: '/dashboard',
      tab: 'resolved-complaints',
    },
    {
      text: 'Pending Complaints',
      icon: <Pending />,
      path: '/dashboard',
      tab: 'pending-complaints',
    },
    {
      text: 'Reopened Complaints',
      icon: <Refresh />,
      path: '/dashboard',
      tab: 'reopen-complaints',
    },
    {
      text: 'Escalated Complaints',
      icon: <TrendingUp />,
      path: '/dashboard',
      tab: 'escalated-complaints',
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/');
  };

  const handleNavigation = (item) => {
    if (item.path === '/dashboard') {
      // Navigate to dashboard and set the tab
      navigate('/dashboard');
      // Use a global function to communicate with AdminDashboard
      if (window.setActiveTab) {
        window.setActiveTab(item.tab);
      }
    } else {
      navigate(item.path);
    }
    setMobileOpen(false);
  };

  const isSelected = (item) => {
    if (location.pathname !== '/dashboard') {
      return location.pathname === item.path;
    }
    // On dashboard, use global key if available to highlight active item
    if (typeof window !== 'undefined' && window.getActiveTabKey) {
      return window.getActiveTabKey() === item.tab;
    }
    return item.path === location.pathname;
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <AdminPanelSettings sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Admin Panel
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
          Complaint Management
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item)}
              selected={isSelected(item)}
              sx={{
                mx: 1,
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isSelected(item) ? 'white' : 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: isSelected(item) ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* User Profile Section */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {user?.email?.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {user?.name || 'Administrator'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <IconButton onClick={handleLogout} size="small">
            <Logout />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton onClick={handleProfileMenuOpen} color="inherit">
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
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
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
              boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default AdminSidebar;
