import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const LabeledTextField = ({ label, name, value, onChange }) => {
  return (
    <Box sx={{ marginBottom: '15px', textAlign: 'left' }}> {/* Reduced margin */}
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 'bold', marginBottom: '5px', color: 'rgb(0,0,0,0.87)' }}
      >
        {label}
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: '40px', // Set a smaller fixed height
            borderRadius: '5px',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            padding: '0 10px', // Reduced horizontal padding
          },
          '& .MuiInputBase-input': {
            height: '20px',
            padding: '0',
          }
        }}
      />
    </Box>
  );
};

export default LabeledTextField;

