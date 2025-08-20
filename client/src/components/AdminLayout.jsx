import React from 'react';
import { Box } from '@mui/material';
import AdminSidebar from './AdminSidebar';

const drawerWidth = -30; // Sidebar ka width

const AdminLayout = ({ children }) => {
  return (

    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}


    <Box sx={{ display: 'flex', height: '200vh', overflow: 'hidden' }}>

    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
 main
>>>>>>> 132e5067687cabaa625c148c4eb69a2798f913ff
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
