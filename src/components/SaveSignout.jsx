import React, { useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import log from "./Util/Logging/AwsLog";

const SaveSignout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Signed Out - Bigtortsupport.ai";
    handleSignOut();
  }, []);

  const handleSignOut = async () => {
    try {
      // Clear session storage
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("TransactionId");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("campaignImage");
      document.title = "Logged Out - Bigtortsupport.ai";

      log.info("User signed out successfully");
    } catch (error) {
      log.error(`Error signing out: ${error}`);
      //navigate("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          maxWidth: 500,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
          Thank You!
        </Typography>
        <Typography variant="body1">
          Your data has been saved successfully.
        </Typography>
        <Typography variant="body1">
          You have been signed out. If you need to update any
          details or access your information again, please sign back in.
        </Typography>
      </Paper>
    </Box>
  );
};

export default SaveSignout;
