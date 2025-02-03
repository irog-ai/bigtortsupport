
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Footer = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to navigate to terms page
  const goToTermsPage = () => {
    navigate('/Terms');
  };

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: '#f7f7f7',
        borderTop: '1px solid #ddd',
        mt: 'auto',
      }}
    >
      <Box sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#e0e0e0' }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Have questions or need help? Visit the BigTort Help Center
        </Typography>
      </Box>
      <Box
        sx={{
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <Typography variant="body2" sx={{ textAlign: 'left', maxWidth: '60%' }}>
          We know that keeping your data secure and safe is important. Learn more about our security and our{' '}
          <span
            onClick={goToTermsPage}
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} // Inline styling to indicate a link
          >
            privacy policy
          </span>.
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'right' }}>
          &copy; CG Legal Tech 2025
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;