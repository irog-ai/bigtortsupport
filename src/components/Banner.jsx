
import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import logo from '../assets/bigtortsupportlogo.png'; // Update this path according to your project

const Banner = () => {
  
  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgb(42, 66, 63)', height: '100px', width: '100%' }}>
      <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            maxHeight: '60px', 
            maxWidth: '100%', 
            margin: '0 auto',
            objectFit: 'contain', // Ensure the logo fits the available space
            marginTop: '20px'            
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Banner;