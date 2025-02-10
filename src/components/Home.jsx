import React, { useEffect } from "react";
import { Box, Grid2 as Grid, Typography, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import backgroundImg from "../assets/backgroundimg.JPG"; // Ensure the path and filename are correct
import phoneImg from "../assets/PhoneImg.png"; // Make sure to import the phone image
import { useNavigate } from "react-router-dom"; // Import the hook for navigation

const Home = () => {
  const navigate = useNavigate(); 
  useEffect(() => {
    document.title = "Home - Bigtortsupport.ai";
    window.scrollTo(0, 0);
  });

  const closeMenu = () => {
    document.querySelector('body').classList.remove('mobile-menu-open')
  }
  
  const handleButtonClick = (event, route) => {
    navigate(route);
    closeMenu();
    if(event!=null)event.preventDefault();
  };

  return (
    <>
      <section id="hero">
        <div id="hero--background"></div>
        <div id="hero--inner-container" className="max-1040">
          <div id="hero--text">
            <h1 id="hero--text--header">Helping Law Firms With Mass Tort</h1>
            
          </div>
        </div>
      </section>
      <section id="fp--intro" className="fp--section-container">
        <div className="page-content-container max-1040 fp-module">
          <div id="fp--intro--phone-icon"></div>
          <div className="fp-module--content">
            <h2>Welcome to BigTortSupport.ai</h2>
            <h3 className="body-text">Leveraging AI-driven automation to streamline mass tort litigation, ensuring efficient client communication, fact-gathering, and data management.</h3>
          </div>
        </div>
      </section>
      <section id="fp--benefits" className="fp--section-container">
        <div className="page-content-container max-1400 fp-module">
          <h2>Our AI-Enhanced Services</h2>
          <h3>Secure Your Clients' SMS Consent</h3>
          <div id="fp--benefits-group--sms" className="fp--benefits-group">
            <div className="fp--benefits-block">
              <h4>Emails Your Clients Can Trust</h4>
              <p>Send AI-tailored email correspondences through your choice of case management software.</p>
            </div>
            <div className="fp--benefits-block">
              <h4>Drive Clients to Your Website</h4>
              <p>Each email will direct your clients to our secure portal for SMS authorization.</p>
            </div>
            <div className="fp--benefits-block">
              <h4>User-Friendly Consent Portals</h4>
              <p>Once in the portal, clients can easily provide SMS consent, ensuring compliance and ease of use.</p>
            </div>
          </div>
          <h3>Ongoing Client Communication</h3>
          <div id="fp--benefits-group--contact" className="fp--benefits-group">
            <div className="fp--benefits-block">
              <h4>Maintain Contact Information</h4>
              <p>Schedule automatic SMS outreach to ensure your clients' contact information remains up-to-date.</p>
            </div>
            <div className="fp--benefits-block">
              <h4>Multi-Channel Follow-Up</h4>
              <p>If an SMS fails to reach the client, AI automatically escalates to email, social media, and direct mail.</p>
            </div>
            <div className="fp--benefits-block">
              <h4>Minimize SMS Fatigue</h4>
              <p>AI manages message pacing to ensure consistent engagement without overwhelming clients.</p>
            </div>
            <div className="fp--benefits-block">
              <h4>Efficient Communications</h4>
              <p>Quickly disseminate case updates, deadlines, and important notices via SMS or email to all clients in a campaign.</p>
            </div>
          </div>
          <h3>AI-Powered Fact Sheet and Document Collection</h3>
          <div id="fp--benefits-group--documents" className="fp--benefits-group">
            <div className="fp--benefits-block">
              <h4>Adaptive AI Breakdown</h4>
              <p>Complex fact sheet questions are converted into discrete prompts, allowing clients to respond in small, manageable steps.</p>
            </div>
            <div className="fp--benefits-block">
              <h4>Smart Reassembly</h4>
              <p>AI compiles individual responses into a structured fact sheet, maintaining logical flow and legal precision.</p>
            </div>
            <div className="fp--benefits-block">
              <h4>Maximize Accessibility</h4>
              <p>Clients can use SMS or our secure web-based portal when completing fact sheets and submitting photos of key documents.</p>
            </div>
            <div className="fp--benefits-block">
              <h4>Organization Made Easy</h4>
              <p>AI processes and categorizes submissions for seamless case file integration.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="fp--services" className="fp--section-container">
        <div className="page-content-container max-1040 fp-module">
          <div className="fp-module--content">
            <h2>Seamless AI-Driven Integration</h2>
            <p>All data collected &mdash; whether via SMS, web-based portal, or AI-assisted document gathering &mdash; can be pushed directly into your preferred case management software (Filevine, Clio, Salesforce, etc.). If an API connection is not yet available, we will develop one at no additional charge.</p>
            <p>At BigTortSupport.ai, we use AI to simplify, automate, and enhance mass tort case management, allowing your firm to focus on legal strategy while ensuring no client is left behind.</p>
            <p>Let us handle the operational burden &mdash; <a href="/login" onClick={(e) => handleButtonClick(e, "/GetStarted")} className="inline-cta">Get started today</a></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;



/*
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
*/
