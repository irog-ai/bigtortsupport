import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const MessageBox = ({ open, onClose, title, message }) => {
  return (
    <Dialog open={open} onClose={() => onClose('close')}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose('close')} sx={{ color: "rgb(42, 66, 63)" }}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageBox;
