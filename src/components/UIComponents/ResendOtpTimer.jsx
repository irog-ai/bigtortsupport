import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';

const ResendOtpTimer = ({ onResend, initialTime = 60 }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [canResend, setCanResend] = useState(false);
  const [resendClicked, setResendClicked] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResendClick = () => {
    setTimeLeft(initialTime);
    setCanResend(false);
    setResendClicked(true);
    onResend();
  };

  return (
    <div style={{ marginTop: "5px" }}>
      {resendClicked ? (
        <Typography variant="body2" color="textSecondary">
          OTP resent successfully.
        </Typography>
      ) : canResend ? (
        <Button
          onClick={handleResendClick}
          variant="text"
          color="primary"
          size="small"
          sx={{ ml: 1 }}
        >
          Resend OTP
        </Button>
      ) : (
        <Typography variant="body2" color="textSecondary">
          Haven't received OTP? Resend in {timeLeft}s
        </Typography>
      )}
    </div>
  );
};

export default ResendOtpTimer; 