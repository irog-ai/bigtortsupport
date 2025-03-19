import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session storage on component mount
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("TransactionId");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("campaignImage");
    document.title = "Logged Out - Bigtortsupport.ai";
  }, []);

  const handleLoginClick = () => {
    navigate("/Login");
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
        <LogoutIcon 
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
          Successfully Signed Out
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4,
            color: "#666",
            lineHeight: 1.6
          }}
        >
          Thank you for using our service. You have been safely logged out of your account. 
          If you need to update any details or access your information again, please sign back in.
        </Typography>

        {/*<Button
          variant="contained"
          onClick={handleLoginClick}
          sx={{
            py: 1.5,
            px: 4,
            backgroundColor: "rgb(42, 66, 63)",
            "&:hover": {
              backgroundColor: "rgb(32, 50, 48)",
            },
            borderRadius: "8px",
            fontSize: "1.1rem"
          }}
        >
          Sign Back In
        </Button>*/}
      </Paper>
    </Box>
  );
};

export default Signout;
