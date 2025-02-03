import React from "react";
import { Box, TextField, Typography, MenuItem } from "@mui/material";

const StyledDropdown = ({ label, name, value, onChange, options }) => {
  return (
    <Box sx={{ marginBottom: '15px', textAlign: 'left' }}>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 'bold', marginBottom: '5px', color: 'rgb(0,0,0,0.87)' }}
      >
        {label}
      </Typography>
      <TextField
        select
        variant="outlined"
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: '40px', // Set a smaller fixed height similar to text fields
            borderRadius: '5px',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            padding: '0 10px', // Padding similar to text fields
          },
          '& .MuiInputBase-input': {
            height: '20px',
            padding: '0',
          },
          '& .MuiSelect-icon': {
            top: 'calc(50% - 12px)', // Centers the dropdown icon
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default StyledDropdown;
