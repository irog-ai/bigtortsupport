import React, { useState } from "react";
import { Box, Typography, Grid2 as Grid } from "@mui/material";

// Assume this data comes from a state or API
const userDetails = {
  firstName: "John",
  middleName: "A.",
  lastName: "Doe",
  phoneNumber: "1234",
  email: "john.doe@example.com",
  addressLine1: "123 Elm Street",
  addressLine2: "Apt 4B",
  city: "Springfield",
  state: "IL",
  zipCode: "62701",
};

const Details = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default",
        overflow: "hidden"
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "90%",
          marginTop:"-200px",
          boxShadow: 3,
          backgroundColor: "background.paper",
          padding: 4,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ marginBottom: 4 }}>
          User Details:
        </Typography>
        <Grid container spacing={3}>
          {/* First line: Name */}
          <Grid size={4} >
            <Typography variant="body1">
              <strong>First Name:</strong> {userDetails.firstName}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body1">
              <strong>Middle Name:</strong> {userDetails.middleName}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body1">
              <strong>Last Name:</strong> {userDetails.lastName}
            </Typography>
          </Grid>

          {/* Second line: Phone Number */}
          <Grid size={4}>
            <Typography variant="body1">
              <strong>Phone Number:</strong> {userDetails.phoneNumber}
            </Typography>
          </Grid>

          {/* Third line: Email */}
          <Grid size={4}>
            <Typography variant="body1">
              <strong>Email:</strong> {userDetails.email}
            </Typography>
          </Grid>
          <Grid size={4}></Grid>

          {/* Fourth line: Address Line 1 and 2 */}
          <Grid size={4}>
            <Typography variant="body1">
              <strong>Address Line 1:</strong> {userDetails.addressLine1}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body1">
              <strong>Address Line 2:</strong> {userDetails.addressLine2}
            </Typography>
          </Grid>
          <Grid size={4}></Grid>

          {/* Fifth line: City and State */}
          <Grid size={4}>
            <Typography variant="body1">
              <strong>City:</strong> {userDetails.city}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body1">
              <strong>State:</strong> {userDetails.state}
            </Typography>
          </Grid>

          {/* Sixth line: Zip Code */}
          <Grid size={4}>
            <Typography variant="body1">
              <strong>Zip Code:</strong> {userDetails.zipCode}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Details;