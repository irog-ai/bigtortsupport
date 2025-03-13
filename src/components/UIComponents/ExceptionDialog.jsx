import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import log from '../Util/Logging/AwsLog';

const ExceptionDialog = ({ open, message, onClose }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    log.error(`Exception occurred: ${message}`);
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{
          width: '100%',
          backgroundColor: '#d32f2f',
          color: 'white',
          '& .MuiAlert-icon': {
            color: 'white'
          }
        }}
      >
        {message || 'Something went wrong. Please try again later.'}
      </Alert>
    </Snackbar>
  );
};

export default ExceptionDialog;
