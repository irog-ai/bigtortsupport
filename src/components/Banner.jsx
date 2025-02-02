import React from 'react';
import '../styles/Banner.css'; // Import a CSS file for styling
import logo from '../assets/bigtortsupportlogo.png'; // Adjust the import according to your actual file type
import { AppBar } from '@mui/material';

const Banner = () => {
    return (
      <AppBar position="static" /* instead of "fixed" */ >
        <div className="banner">
          <img src={logo} alt="Logo" className="banner-logo" />
        </div>
      </AppBar>
    );
  };

export default Banner;