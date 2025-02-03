import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper, Checkbox, FormControlLabel } from "@mui/material";
import LabeledTextField from "./UIComponents/LabeledTextField";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - Bigtortsupport.ai";
  }, []);

  const initialState = {
    lastName: "",
    phoneDigits: "",
    houseNumber: "",
    acceptTerms: false, // Add acceptTerms to the state
  };

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setState({
      ...state,
      [name]: type === 'checkbox' ? checked : value // Handle checkbox state
    });
  };

  const handleLoginClick = () => {
    if (!state.acceptTerms) {
      alert("You must accept the terms and conditions to proceed.");
      return;
    }
    navigate("/Details"); // Redirect to the Details page
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        mt: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "30px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{ marginBottom: "20px", fontWeight: "bold", fontSize: "24px" }}
          variant="h5"
        >
          Enter Your Details
        </Typography>
        <Typography
          variant="body2"
          sx={{ lineHeight: 1.1 }}
        >
          For verification purposes, please use the same information you used
          when signing your attorney engagement letter in this matter. You will
          be given an opportunity to update any changed contact information on
          the next page.
        </Typography>

        <Box sx={{ mt: 3 }}>
          <LabeledTextField
            label="Last Name"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
          />
          <LabeledTextField
            label="Last 4 digits of Cell Phone Number"
            name="phoneDigits"
            value={state.phoneDigits}
            onChange={handleChange}
          />
          <LabeledTextField
            label="Street Number or House Number"
            name="houseNumber"
            value={state.houseNumber}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="acceptTerms"
                checked={state.acceptTerms}
                onChange={handleChange}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I accept the <a href="/Terms" style={{ color: 'blue', textDecoration: 'underline' }}>terms and conditions</a>
              </Typography>
            }
          />
          <Box sx={{ my: 2, textAlign: "center" }}>
            <LockIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", marginRight: "5px" }}
            />
            <Typography variant="body2" component="span">
              Your information is secure and protected
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
            sx={{
              width: "100%",
              mt: 2,
              backgroundColor: "rgb(42, 66, 63)",
            }}
          >
            Proceed
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;