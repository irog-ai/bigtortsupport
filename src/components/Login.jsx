import React, { useState } from "react";
import { Box, Button, Typography, Grid2 as Grid } from "@mui/material";
import LabeledTextField from "./UIComponents/LabeledTextField";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const initialState = {
    lastName: "",
    phoneDigits: "",
    houseNumber: "",
  };
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleLoginClick = () => {
    // Here you can validate the inputs or handle login logic
    navigate("/Details"); // Redirect to the Details page
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        width: "100vw",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      <Box
        sx={{
          width: "100%", // Take full width of the container
          // Set a max width to limit it centrally
          textAlign: "center", // Center align the text elements
        }}
      >
        <Typography
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          variant="h5"
          gutterBottom
        >
          Login Details
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Grid container justifyContent="center">
            <Grid size={3} />
            <Grid size={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <LabeledTextField label="Last Name" onChange={handleChange} />
                <LabeledTextField
                  label="Last 4 digits of phone number"
                  onChange={handleChange}
                />
                <LabeledTextField
                  label="Street No or House Number"
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLoginClick}
                  sx={{
                    width: "100px",
                    alignSelf: "center",
                    backgroundColor: "rgb(42, 66, 63)",
                  }}
                >
                  Login
                </Button>
              </Box>
            </Grid>
            <Grid size={3} />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
