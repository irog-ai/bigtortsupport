import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const InactiveSession = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session storage on component mount
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("TransactionId");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("campaignImage");
    document.title = "Session Expired - Bigtortsupport.ai";
  }, []);

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
        minHeight: "60vh"
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "40px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          borderRadius: "12px",
          backgroundColor: "#ffffff"
        }}
      >
        <AccessTimeIcon
          sx={{ 
            fontSize: 60, 
            color: "rgb(42, 66, 63)",
            mb: 2
          }} 
        />
        
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3,
            fontWeight: "bold",
            color: "rgb(42, 66, 63)"
          }}
        >
          Session Expired
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4,
            color: "#666",
            lineHeight: 1.6
          }}
        >
          Your session has expired due to inactivity. For your security, you have been automatically logged out. 
          Please sign in again to continue accessing your account and information.
        </Typography>
      </Paper>
    </Box>
  );
};

export default InactiveSession;
