import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../../components/Test/HeaderTest.jsx';
import Sidebar from '../../components/Test/SidebarTest.jsx';
import MainContent from '../../components/Test/MainContentTest.jsx';

export default function Hometest() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <MainContent />
    </Box>
  );
}