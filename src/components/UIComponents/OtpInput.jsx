import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, TextField } from '@mui/material';
import LabeledTextField from './LabeledTextField';
import ResendOtpTimer from './ResendOtpTimer';

const OtpInput = ({ value, onChange, onSubmit, validationMessage, resendLoginOtp }) => {
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate OTP whenever value changes
    if (!value) {
      setError('');
      setIsValid(false);
    } else if (!/^\d+$/.test(value)) {
      setError('OTP must contain only numbers');
      setIsValid(false);
    } else if (value.length !== 6) {
      setError('OTP must be 6 digits');
      setIsValid(false);
    } else {
      setError('');
      setIsValid(true);
    }
  }, [value]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Only allow numbers and limit to 6 digits
    if (inputValue === '' || (/^\d*$/.test(inputValue) && inputValue.length <= 6)) {
      onChange(inputValue);
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      onSubmit();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isValid) {
      onSubmit();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '30px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        borderRadius: '8px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: '#fff',
        boxShadow: '0 0 0 1000px rgba(255, 255, 255, 0.8)'
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '24px' }}
      >
        Verification Required
      </Typography>
      
      <Typography variant="body2" sx={{ marginBottom: '20px' }}>
        A verification code has been sent to your phone and email. Please enter the 6-digit code below.
      </Typography>
      
      <LabeledTextField
        label="Verification Code"
        name="otp"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        error={!!error}
        helperText={error || "Enter your 6-digit OTP"}
        inputProps={{
          maxLength: 6,
          inputMode: 'numeric',
          pattern: '[0-9]*'
        }}
      />
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!isValid}
          sx={{ minWidth: '120px', backgroundColor: "rgb(42, 66, 63)", color: "white"  }}
        >
          Verify
        </Button>
      </Box>
      {validationMessage && (
        <Typography 
          variant="body2" 
          color="error" 
          sx={{ mt: 2 }}
        >
          {validationMessage}
        </Typography>
      )}
      <ResendOtpTimer onResend={resendLoginOtp} initialTime={60} />
    </Paper>
  );
};

export default OtpInput;
