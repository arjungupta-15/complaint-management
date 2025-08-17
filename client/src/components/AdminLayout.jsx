import React from 'react';
import { Box } from '@mui/material';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 280px)` },
          ml: { sm: '0px' },
          mt: { xs: 8, sm: 0 },
          backgroundColor: 'background.default',
          height: '100vh',
          overflow: 'auto',
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