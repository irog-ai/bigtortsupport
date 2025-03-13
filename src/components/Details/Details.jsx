import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchWithAuth } from "../Util/fetchWithAuth";   
import PrivacyNotice from "../UIComponents/PrivacyNotice";
import ConsentSection from "./ConsentSection";
import ContactInformationSection from "./ContactInformationSection";
import EmergencyContactSection from "./EmergencyContactSection";
import UpdatingSection from "./UpdatingSection";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const [state, setState] = useState({
    userDetails: {
        ID: "",
        FirstName: "",
        LastName: "",
        MiddleName: "",
        Gender: "",
        DOB: "",
        CampaignId: "",
        litigantAddress: [
          {
            AddressLine1: "",
            AddressLine2: "",
            City: "",
            State: "",
            Zipcode: "",
            County: "",
            Country: "",
            EmailId: "",
            PhoneNo: "",
            SocialMediaHandles: [{ handle: "", link: "" }],
            EmergencyContactName: "",
            EmergencyContactPhone: "",
            EmergencyContactEmail: "",
            IsActive: "",
            SmsConsent: false,
          },
        ],
      },
      isPhoneVerified: false,
      isEmailVerified: false,
      isInformationChanged: false,
      updatingSection: null,
      smsOtpSent: false,
      smsOtpVerified: false,
      smsVerificationMessage: "",
      smsEnteredOtp: "",
      emailOtpSent: false,
      emailOtpVerified: false,
      emailEnteredOtp: "",
      emailVerificationMessage: "",
      transactionIdKey: "",
    });

    const [errors, setErrors] = useState({
        FirstName: "",
        LastName: "",
        EmailId: "",
        PhoneNo: "",
        EmergencyContactName: "",
        EmergencyContactPhone: "",
        EmergencyContactEmail: "",
        // Add other fields as needed
      });

  useEffect(() => {
    document.title = "Details - Bigtortsupport.ai";
    fetchUserData(userId);
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    return () => {
      document.onmousemove = null;
      document.onkeydown = null;
    };
  }, []);

  const fetchUserData = async (userId) => {
    try {
      console.log("fetching details");
      let path = "details/litigantDetails/" + userId;
      const data = await fetchWithAuth(path);
      const response = data.litigantDetails;
      console.log(response);
      if (
        !response.litigantAddress[0].SocialMediaHandles ||
        response.litigantAddress[0].SocialMediaHandles.length === 0
      ) {
        console.log("no social media handles");
        response.litigantAddress[0] = {
          ...response.litigantAddress[0],
          SocialMediaHandles: [{ handle: "", link: "" }],
        };
        console.log(response.litigantAddress[0]);
      } else {
        console.log("social media handles");
        response.litigantAddress[0].SocialMediaHandles = JSON.parse(
          JSON.stringify(response.litigantAddress[0].SocialMediaHandles)
        );
      }
      setState((prevState) => ({ ...prevState, userDetails: response }));
    } catch (error) {
      console.log(error);
      setState((prevState) => ({ ...prevState, userDetails: {} }));
    }
  };

  const resetTimer = () => {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      console.log("User is idle");
      handleSignOut();
    }, 15 * 60 * 1000); // 15 minutes idle timeout
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("TransactionId");
    //alert("You have been logged out due to inactivity.");
    navigate("/InactiveSession");
  };

  const handleUpdateInformation = async () => {
    if (!validateAllFields()) {
      return; // Stop if there are validation errors
    }

    console.log("Updating information");
    let path = "details/update-information";
    console.log(sessionStorage.getItem("TransactionId"));
    //state.userDetails.litigantAddress[0].SocialMediaHandles = state.userDetails.litigantAddress[0].SocialMediaHandles.filter((handle) => handle.handle !== "");
    const response = await fetchWithAuth(path+"/"+state.userDetails.litigantAddress[0].PhoneNo, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userDetails: state.userDetails,
        transactionId: sessionStorage.getItem("TransactionId"),
      },
    });
    console.log(response);
    if (response.success) {
      alert("Information updated successfully");
    } else {
      alert("Failed to update information");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 4, px: 4, py: 2 }}>
      {collectErrorMessages().length > 0 && (
        <Paper
          sx={{ mb: 4, p: 3, backgroundColor: "orangered", color: "white" }}
          elevation={3}
        >
          <Typography variant="h6" gutterBottom>
            Please fix the following errors:
          </Typography>
          <ul>
            {collectErrorMessages().map((error, index) => (
              <li key={index}>
                <Typography variant="body1">{error}</Typography>
              </li>
            ))}
          </ul>
        </Paper>
      )}

      <PrivacyNotice />
      <ConsentSection state={state} setState={setState} />
      <ContactInformationSection
        state={state}
        setState={setState}
        handleUpdateButtonClick={handleUpdateButtonClick}
      />
      <EmergencyContactSection state={state} setState={setState} />
      <UpdatingSection
        state={state}
        setState={setState}
        errors={errors}
        setErrors={setErrors}
        handleChange={handleChange}
        handleSendSmsOtp={handleSendSmsOtp}
        handleVerifySmsOtp={handleVerifySmsOtp}
        handleSendEmailOtp={handleSendEmailOtp}
        handleVerifyEmailOtp={handleVerifyEmailOtp}
        handleCancelUpdation={handleCancelUpdation}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateInformation}
        sx={{ backgroundColor: "rgb(42, 66, 63)" }}
      >
        UPDATE INFORMATION
      </Button>
    </Box>
  );
};

export default Details;