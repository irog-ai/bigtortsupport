import React from "react";
import { Box, Typography } from "@mui/material";
import { PrivacyTip } from '@mui/icons-material';

const PrivacyNotice = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5', // Light background for contrast
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <PrivacyTip color="primary" sx={{ mr: 2 }} /> {/* Icon for added emphasis */}
      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
        We know your privacy matters. We never sell, share, or use your info for marketing—period.
        Not from us, not from your attorneys, not from anyone. Your case is about getting you the
        best outcome, and these updates help ensure you stay informed every step of the way.
      </Typography>
    </Box>
  );
};

export default PrivacyNotice;
