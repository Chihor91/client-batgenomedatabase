import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import HeaderTest from '../../components/Test/HeaderTest.jsx';
import SidebarTest from '../../components/Test/SidebarTest.jsx';
import MainContent from '../../components/Test/MainContentTest.jsx';

export default function Hometest() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HeaderTest />
      <SidebarTest />
      <MainContent />
    </Box>
  );
}