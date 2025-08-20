import React from 'react';
import { Box } from '@mui/material';
import AdminSidebar from './AdminSidebar';

const drawerWidth = -30; // Sidebar ka width (positive value use kar)

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { sm: `${drawerWidth}px` }, // sidebar ke baad content shift ho jaye
          mt: { xs: 8, sm: 0 }, // mobile me thoda top margin
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
