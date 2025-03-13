

import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorNotification = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        zIndex: 1000,
      }}
    >
      <ErrorIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};

export default ErrorNotification;

