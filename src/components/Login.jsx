import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LabeledTextField from "./UIComponents/LabeledTextField";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { UAParser } from "ua-parser-js";
import MessageBox from "./UIComponents/MessageBox";
import Terms from "./Terms";
import OtpInput from "./UIComponents/OtpInput";
import log from "./Util/Logging/AwsLog";
import ExceptionDialog from "./UIComponents/ExceptionDialog";
const apipath = import.meta.env.VITE_API_URL;
//console.log(apipath);

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    otpValidationMessage: "",
    lastName: "",
    phoneDigits: "",
    houseNumber: "",
    acceptTerms: false,
    ipAddress: "",
    location: null,
    device: {
      browser: "",
      browserVersion: "",
      os: "",
      osVersion: "",
      device: "",
    },
    messageBoxOpen: false,
    messageBoxMessage: "",
    otpInputOpen: false,
    otpInputValue: "",
    loginLitigantId: "",
    otpAttempts: 0,
  });
  const [errors, setErrors] = useState({
    lastName: "",
    phoneDigits: "",
    houseNumber: "",
    // Add other fields as needed
  });
  
  const [isCampaignValid, setIsCampaignValid] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState({});
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [exceptionDialogOpen, setExceptionDialogOpen] = useState(false);
  const [exceptionDialogMessage, setExceptionDialogMessage] = useState(""); 

  const handleTermsOpen = () => setIsTermsModalOpen(true);
  const handleTermsClose = () => setIsTermsModalOpen(false);

  // Idle management
  let idleTimeout;
  const handleOpen = (message) =>
    setState((prevState) => ({
      ...prevState,
      messageBoxOpen: true,
      messageBoxMessage: message,
    }));

  const handleClose = (action) => {
    log.info(`Dialog closed with action: ${action}`);
    setState((prevState) => ({
      ...prevState,
      messageBoxOpen: false,
    }));
  };

  const handleError = (error, customMessage, errorMessage) => {
    log.error(`Error occured while : ${customMessage} Error : ${error}`);
    //console.error("Error occured while :", customMessage, "Error :", error);
    setExceptionDialogOpen(true);
    setExceptionDialogMessage(errorMessage);
  };

  useEffect(() => {
    document.title = "Login - Bigtortsupport.ai";
    sessionStorage.removeItem("jwtToken");  
    sessionStorage.removeItem("TransactionId");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("campaignImage");
    console.log(sessionStorage.getItem("jwtToken"));

    const validateCampaign = async () => {
      const functionPath = `${apipath}/campaign/validateCampaign`;
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
          const response = await axios.get(`${functionPath}/${code}`);
          log.info(`Login page - Campaign details: ${JSON.stringify(response.data)}`);
          setIsCampaignValid(response.data);
          setCampaignDetails(response.data);
        } else {
          setIsCampaignValid(false);
        }        
      } catch (error) {
        handleError(error, "Error validating campaign","We are unable to get your campaign details.Something went wrong. Please try again later.");
        setIsCampaignValid(false);
      }
    };

    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setState((prevState) => ({
          ...prevState,
          ipAddress: data.ip,
        }));
        fetchLocation(data.ip);
        log.info(`Login page - IP address: ${data.ip}`);
      } catch (error) {
        handleError(error, "Error fetching IP address");
        //console.error("Error fetching IP address:", error);
      }
    };

    const fetchLocation = async (ip) => {
      const cachedLocation = sessionStorage.getItem(`location_${ip}`);
      if (cachedLocation) {
        setState((prevState) => ({
          ...prevState,
          location: JSON.parse(cachedLocation),
        }));
        return;
      }

      try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);

        const locationData = await response.json();
        sessionStorage.setItem(`location_${ip}`, JSON.stringify(locationData));
        setState((prevState) => ({
          ...prevState,
          location: locationData,
        }));
        log.info(`Login page - Location: ${JSON.stringify(locationData)}`);
        //console.log(locationData);
      } catch (error) {
        handleError(error, "Error fetching location");
      }
    };

    const getDeviceDetails = () => {
      try {
        const parser = new UAParser();
        const result = parser.getResult();
        log.info(`Login page - Device details: ${JSON.stringify(result)}`);
        //console.log(result);

        const deviceInfo = {
          browser: result.browser.name || "",
          browserVersion: result.browser.version || "",
          os: result.os.name || "",
          osVersion: result.os.version || "",
          device: result.device.model || "desktop",
        };

        log.info(`Login page - Device Info: ${JSON.stringify(deviceInfo)}`);
        //console.log("Device Info:", deviceInfo);
        setState((prevState) => ({
          ...prevState,
          device: deviceInfo,
        }));
      } catch (error) {
        //log.error("Error fetching device details:", error);
        handleError(error, "Error fetching device details");
        // console.error("Error fetching device details:", error);
      }
    };

    fetchIpAddress();
    getDeviceDetails();
    validateCampaign();   
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const error = validateField(name, value);
    setState({
      ...state,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "lastName":
        if (!value) return "Last Name is required";
        if (!/^[A-Za-z\s-]+$/.test(value))
          return "Last Name should only contain letters, spaces and hyphens";
        return "";
      case "phoneDigits":
        if (!value) return "Phone Number is required";
        if (!/^\d{4}$/.test(value))
          return "Please enter only last 4 digits of your phone number";
        return "";
      case "houseNumber":
        if (!value) return "House Number is required";
        if (!/^\d+$/.test(value))
          return "House Number should only contain numbers";
        return "";
      default:
        return "";
    }
  };

  const verifyOtp = async () => {
    if (state.otpAttempts >= 3) {
      setState((prevState) => ({
        ...prevState,
        messageBoxMessage:
          "Too many failed attempts. Your account has been locked.",
        showOtpInput: false,
      }));
      return;
    }

    try {
      const otpResponse = await axios.post(`${apipath}/login/verifyLoginOtp`, {
        otp: state.otpInputValue,
        transactionId: sessionStorage.getItem("TransactionId"),
        litigantId: state.loginLitigantId,
        campaignId: campaignDetails.Id,
        ipAddress: state.ipAddress,
        browser: state.device.browser,
        browserVersion: state.device.browserVersion,
        os: state.device.os,
        osVersion: state.device.osVersion,
        device: state.device.device,
        location: state.location,
        lastName: state.lastName,
        phoneDigits: state.phoneDigits,
        houseNumber: state.houseNumber,
      });
      log.info(
        `Verify OTP response: ${JSON.stringify(otpResponse)} for litigant id: ${state.loginLitigantId}`
      );
      if (otpResponse.data.status) {
        sessionStorage.setItem("jwtToken", otpResponse.data.token);
        log.info(`Redirecting to Details page for litigant id: ${state.loginLitigantId}`);
        sessionStorage.setItem("userId", otpResponse.data.userDetails.id);
        sessionStorage.setItem("campaignImage", campaignDetails.CampaignImageUrl);
        navigate("/Details");
      } else {
        // Check if this is the last attempt
        if (state.otpAttempts + 1 >= 3) {
          // Make API call to lock IP
          try {
            await axios.post(`${apipath}/login/lockUser`, {
              transactionId: sessionStorage.getItem("TransactionId"),
              ipAddress: state.ipAddress,
              litigantId: state.loginLitigantId,
            });
            log.info(`Account locked for litigant id: ${state.loginLitigantId}`);
          } catch (lockError) {
            handleError(lockError, "Error locking IP");
            //console.error("Error locking IP:", lockError);
          }

          // Close OTP input and show locked message
          setState((prevState) => ({
            ...prevState,
            otpInputOpen: false,
            messageBoxOpen: true,
            otpAttempts: 0,
            messageBoxMessage:
              "Your account is locked. Please try again after some time.",
            //otpAttempts: state.otpAttempts + 1,
          }));
        } else {
          log.info(`Invalid OTP entered for litigant id: ${state.loginLitigantId}, OTP entered: ${state.otpInputValue}`);
          // Not the last attempt, show remaining attempts
          setState((prevState) => ({
            ...prevState,
            otpValidationMessage: `Invalid OTP. ${
              3 - state.otpAttempts - 1
            } attempt(s) remaining.`,
            otpAttempts: state.otpAttempts + 1,
          }));
        }
      }
    } catch (error) {      
      handleError(error, "Error verifying OTP for litigant id: " + state.loginLitigantId);
    }
  };

  const resendLoginOtp = async () => {
    try {
      const response = await axios.post(`${apipath}/login/resendLoginOtp`, {
        transactionId: sessionStorage.getItem("TransactionId"),
        litigantId: state.loginLitigantId,
      });
      log.info(
        `Resend OTP response: ${response} for litigant id: ${state.loginLitigantId}`
      );
      //console.log("Resending OTP");
    } catch (error) {      
      handleError(error, "Error resending OTP for litigant id: " + state.loginLitigantId);
    }
  };

  const handleProceedClick = async () => {
    
    if (state.location && state.location.country !== "US") {
      handleOpen("Login is restricted to users within the United States.");
      log.info(
        `Login is restricted to users within the United States. Location: 
        ${state.location}, IP Address: ${state.ipAddress} and details entered:
         ${state.lastName}, ${state.phoneDigits}, ${state.houseNumber}`
      );
      return;
    }

    if (errors.lastName || errors.phoneDigits || errors.houseNumber) {
      handleOpen("Please fix all the errors to proceed.");
      //alert("Please enter all the details to proceed.");
      return;
    }

    if (
      state.lastName.length === 0 ||
      state.phoneDigits.length === 0 ||
      state.houseNumber.length === 0
    ) {
      handleOpen("Please enter all the details to proceed.");
      //alert("Please enter all the details to proceed.");
      return;
    }
    if (!state.acceptTerms) {
      handleOpen("You must accept the terms and conditions to proceed.");
      //alert("You must accept the terms and conditions to proceed.");
      return;
    }

    try {
      // Call your API with the custom fields
      const requestBody = {
        lastName: state.lastName,
        phoneDigits: state.phoneDigits,
        houseNumber: state.houseNumber,
        campaignId: campaignDetails.Id,
        ipAddress: state.ipAddress,
        browser: state.device.browser,
        browserVersion: state.device.browserVersion,
        os: state.device.os,
        osVersion: state.device.osVersion,
        device: state.device.device,
        location: state.location,
      };

      const response = await axios.post(
        `${apipath}/login/checkCredentials`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      log.info(`Check credentials response: ${JSON.stringify(response.data)} 
      for litigant id: ${state.loginLitigantId} and entered details: ${JSON.stringify(requestBody)}`);
      if (response.data.status) {
        // CHECK LATER IF IT IS GOOD PRACTICE TO STOTE IN LOCAL STORAGE, Save the JWT and TransactionId to localStorage
        //sessionStorage.setItem("jwtToken", response.data.token);
        sessionStorage.setItem("TransactionId", response.data.transactionId);
        //console.log("Sign in successful:", response.data);
        setState((prevState) => ({
          ...prevState,
          otpInputOpen: true,
          otpInputValue: "",
          otpAttempts: 0,
          otpValidationMessage: "",
          loginLitigantId: response.data.litigantID,
        }));
        // Function to verify OTP
      } else if (
        !response.data.status &&
        response.data.message === "User Locked"
      ) {
        setState((prevState) => ({
          ...prevState,
          errorMessage:
            "Your account is locked. Please try again after some time.",
        }));
      } else if (
        !response.data.status &&
        response.data.message ===
          "Too many failed login attempts. Try again later after 15 minutes."
      ) {
        setState((prevState) => ({
          ...prevState,
          errorMessage:
            "Too many failed login attempts. Try again later after 15 minutes.",
        }));
      } else if (
        !response.data.status &&
        response.data.message === "Invalid credentials"
      ) {
        let attemptCount = response.data.attempts;
        let message = "";
        if (attemptCount < 2 && attemptCount > 0) {
          message =
            "Entered information doesn't match with our data. Please try again";
        } else if (attemptCount >= 2 && attemptCount < 5) {
          message =
            "Entered information doesn't match with our data.You have " +
            (5 - attemptCount) +
            " attempt(s) left.";
        } else if (attemptCount === 0) {
          message =
            "Too many failed login attempts. Try again later after 15 minutes.";
        } else {
          message =
            "Entered information doesn't match with our data. Please try again";
        }
        setState((prevState) => ({
          ...prevState,
          errorMessage: message,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          errorMessage: "An error occurred. Please try again later.",
        }));
      }
    } catch (error) {
      handleError(error, "Error while sending login otp for litigant id: " + state.loginLitigantId);      
    }
  };

  const handleOtpChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      otpInputValue: value,
    }));
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
      <ExceptionDialog
        open={exceptionDialogOpen}
        message={exceptionDialogMessage}
        onClose={() => setExceptionDialogOpen(false)}
      />
      <Modal
        open={isTermsModalOpen}
        onClose={handleTermsClose}
        aria-labelledby="terms-modal-title"
        aria-describedby="terms-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxHeight: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            borderRadius: 2,
          }}
        >
          <Terms /> {/* Render your existing terms content here */}
          <Button
            onClick={handleTermsClose}
            sx={{ mt: 2, backgroundColor: "rgb(42, 66, 63)", color: "white" }}
            variant="contained"
          >
            Close
          </Button>
        </Box>
      </Modal>
      {state.otpInputOpen && (
        <OtpInput
          value={state.otpInputValue}
          onChange={handleOtpChange}
          onSubmit={verifyOtp}
          validationMessage={state.otpValidationMessage}
          resendLoginOtp={resendLoginOtp}
        />
      )}
      <MessageBox
        open={state.messageBoxOpen}
        onClose={handleClose}
        severity="information"
        message={state.messageBoxMessage}
        buttons={["OK"]}
      />
      {isCampaignValid ? (
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
          <Typography variant="body2" sx={{ lineHeight: 1.1 }}>
            For verification purposes, please use the same information you used
            when signing your attorney engagement letter in this matter. You
            will be given an opportunity to update any changed contact
            information on the next page.
          </Typography>

          <Box sx={{ mt: 3 }}>
            <LabeledTextField
              label="Last Name"
              name="lastName"
              value={state.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <LabeledTextField
              label="Last 4 digits of Cell Phone Number"
              name="phoneDigits"
              value={state.phoneDigits}
              onChange={handleChange}
              error={!!errors.phoneDigits}
              helperText={errors.phoneDigits}
            />
            <LabeledTextField
              label="Street Number or House Number"
              name="houseNumber"
              value={state.houseNumber}
              onChange={handleChange}
              error={!!errors.houseNumber}
              helperText={errors.houseNumber}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="acceptTerms"
                  checked={state.acceptTerms}
                  onChange={handleChange}
                  color="primary"
                  sx={{ "&.Mui-checked": { color: "rgb(42, 66, 63)" } }}
                  //sx={{ color: "rgb(42, 66, 63)" }}
                />
              }
              label={
                <Typography variant="body2">
                  I accept the{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleTermsOpen();
                    }}
                    style={{
                      color: "rgb(42, 66, 63)",
                      textDecoration: "underline",
                    }}
                  >
                    terms and conditions
                  </a>
                </Typography>
                /*<Typography variant="body2">                  
                  I accept the{" "}
                  <a
                    href="/Terms"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    terms and conditions
                  </a>
                </Typography> */
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
            {state.errorMessage && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {state.errorMessage}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleProceedClick}
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
      ) : (
        <Paper
          elevation={3}
          sx={{
            padding: "30px",
            maxWidth: "600px",
            width: "100%",
            textAlign: "center",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Attention Litigants: Please Visit Your Law Firm's Website
          </Typography>
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.5, color: "text.secondary" }}
          >
            If you are a client seeking case updates, submitting documents, or
            responding to communications, please visit your law firm's official
            website to access the correct portal for your mass tort campaign.
            There should be a link on the firm's homepage with the word
            "connect" which will get you where you need to be. If it is not
            there, you can email us at{" "}
            <a
              href="mailto:info@cglegaltech.com"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              info@cglegaltech.com
            </a>
            .{""}
            <br />
            <br />
            BigTortSupport.ai provides AI-driven case management tools for law
            firms, but we do not directly handle individual claims or provide
            legal representation. Please check your law firm's website or
            contact them directly for assistance with your case.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            If you reached this page by mistake, please refer to the
            communications you received from your law firm for the correct web
            link.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Login;
