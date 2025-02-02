import React, { useEffect } from "react";
import "../styles/Home.css";
import { Box, Grid2 as Grid, Typography, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import backgroundImg from "../assets/backgroundimg.JPG"; // Ensure the path and filename are correct
import phoneImg from "../assets/PhoneImg.png"; // Make sure to import the phone image
import { useNavigate } from "react-router-dom"; // Import the hook for navigation

const Home = () => {
  const navigate = useNavigate(); 
  useEffect(() => {
    document.title = "Home - Bigtortsupport.ai";
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        width: '100vw',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
        
      }}
    >
      <Box
        sx={{
          textAlign: "center", 
          color: "#fff",
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: '100%',
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 0,
          position: 'relative',
          zIndex: 1
        }}
      >
        <Grid container justifyContent="center">
        
          <Grid size={5}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                color: "#000",
                fontWeight: 700,
                textAlign: "left",
                //letterSpacing: "0.1em",
                textShadow: "2px 2px 4px rgba(255,255,255,0.5)",
                marginBottom: "1rem",
                fontFamily: "'Roboto', sans-serif"
              }}
            >
              Helping Law Firms With Mass Tort
            </Typography>
          </Grid>
          <Grid size={7}>
          <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/Login")} // Redirect to a new route
              sx={{ 
                display: 'block', 
                mx: 'auto', 
                backgroundColor: 'rgb(42, 66, 63)', 
                width: '150px', // Increased width to fit text
                marginTop: '100px',
                whiteSpace: 'nowrap' // Prevents text from wrapping
              }}
            >
              GET STARTED
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* New green section with phone and text */}
      <Box
        sx={{
          backgroundColor: "rgb(42, 66, 63)",
          width: '100%',
          height: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid 
          container 
          sx={{ 
            maxWidth: '80%',
            margin: '0 auto',
            pl: 4
          }}
          alignItems="center" 
          justifyContent="space-between"
          spacing={8}
        >
          <Grid xs={3}>
            <Box
              component="img"
              src={phoneImg}
              alt="Phone"
              sx={{
                maxHeight: '150px',
                width: 'auto',
                objectFit: 'contain',
                ml: 4
              }}
            />
          </Grid>
          <Grid xs={7}>
            <Box sx={{ textAlign: 'left', pl: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#fff',
                  marginBottom: 2,
                }}
              >
                We're Here to Help.
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#fff',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}
              >
                Automatic Client Contact
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
