import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const LabeledTextField = ({ label, value, onChange }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      {/* Display the label */}
      <Typography variant="body1" sx={{ width: '180px', textAlign: 'left' }}> {label}: </Typography>
      {/* Input field */}
      <TextField 
        variant="outlined" 
        value={value} 
        onChange={onChange} 
        sx={{ width: '300px' , alignItems : 'right'}} // Fixed width for consistency
      />
    </Box>
  );
};

export default LabeledTextField;

