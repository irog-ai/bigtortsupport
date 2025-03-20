import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid2 as Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import ResendOtpTimer from "./UIComponents/ResendOtpTimer";
import LabeledTextField from "./UIComponents/LabeledTextField";
import StyledDropdown from "./UIComponents/StyledDropdown";
import PrivacyNotice from "./UIComponents/PrivacyNotice";
import WarningIcon from "@mui/icons-material/Warning";
import { Auth } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchWithAuth } from "./Util/fetchWithAuth";
import MessageBox from "./UIComponents/MessageBox";
import LoadingSpinner from "./UIComponents/LoadingSpinner";
import log from "./Util/Logging/AwsLog";
import ExceptionDialog from "./UIComponents/ExceptionDialog";

const Details = () => {
  //const apipath = process.env.REACT_APP_API_PATH;
  const navigate = useNavigate();
  const location = useLocation();
  const userId = sessionStorage.getItem("userId");
  //const campaignImage = location.state?.campaignImage;
  console.log(userId);

  const [state, setState] = useState({
    userDetails: {
      ID: "",
      FirstName: "",
      LastName: "",
      MiddleName: "",
      Gender: "",
      DOB: "",
      CampaignId: "",
      recentPhoneChange: false,
      recentEmailChange: false,
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
    isFormValid: true,
    PhoneNoNew: "",
    EmailIdNew: "",
    isLoading: false,
  });

  const [errors, setErrors] = useState({
    FirstName: "",
    LastName: "",
    EmailId: "",
    PhoneNo: "",
    EmergencyContactName: "",
    EmergencyContactPhone: "",
    EmergencyContactEmail: "",
    PhoneNoNew: "",
    EmailIdNew: "",
    SocialMediaHandlesProfileLink: [],
    // Add other fields as needed
  });

  const [lastPhoneUpdate, setLastPhoneUpdate] = useState(null);
  const [lastEmailUpdate, setLastEmailUpdate] = useState(null);
  const [messageBoxOpen, setMessageBoxOpen] = useState(false);
  const [messageBoxTitle, setMessageBoxTitle] = useState("");
  const [messageBoxMessage, setMessageBoxMessage] = useState("");
  const [exceptionDialogOpen, setExceptionDialogOpen] = useState(false);
  const [exceptionDialogMessage, setExceptionDialogMessage] = useState("");

  let idleTimeout;

  useEffect(() => {
    document.title = "Details - Bigtortsupport.ai";
    if(userId){
      fetchUserData(userId);
    } else {
      navigate("/");
    }
    /*...userDetailsJson,
    socialMediaHandles: userDetailsJson?.socialMediaHandles || [],
    currentHandle: "",*/

    console.log(sessionStorage.getItem("jwtToken"));
    console.log(sessionStorage.getItem("TransactionId"));
    // Set up idle timer
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    // Fetch last update dates from backend or initialize them
    // Example: setLastPhoneUpdate(new Date('2023-09-01'));
    // Example: setLastEmailUpdate(new Date('2023-09-01'));

    return () => {
      //document.onmousemove = null;
      //document.onkeydown = null;
    };
  }, []);

  const fetchUserData = async (userId) => {
    console.log("fetching details");
    try {
      console.log("fetching details");
      let path = "details/litigantDetails/" + userId;
      const data = await fetchWithAuth(path);
      const response = data.litigantDetails;
      //console.log(response);
      log.info(
        `Litigant details: ${JSON.stringify(
          response
        )} for litigant id: ${userId}`
      );
      if (
        response.litigantAddress[0].SmsConsent === false ||
        response.litigantAddress[0].SmsConsent === null
      ) {
        response.litigantAddress[0] = {
          ...response.litigantAddress[0],
          SmsConsent: true,
        };
      }
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
      handleError(
        error,
        `Fetch user details for litigant id: ${userId}`,
        "Failed to fetch user details. Please try again later."
      );
      setState((prevState) => ({ ...prevState, userDetails: {} }));
    }
  };

  const resetTimer = () => {
    console.log("resetTimer");
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      console.log("User is idle");
      handleSignOut();
    }, 15 * 60 * 1000); // 15 minutes idle timeout
  };

  const socialMediaOptions = [
    "Facebook",
    "Twitter",
    "LinkedIn",
    "Instagram",
    "TikTok",
    "Snapchat",
    "Telegram",
    "Discord",
    "Reddit",
    "Mastodon",
    "None",
  ];

  const canUpdate = () => {
    const { recentPhoneChange, recentEmailChange } = state.userDetails;
    return !recentPhoneChange && !recentEmailChange;
  };

  const handleUpdateButtonClick = (section) => {
    if ((section === "email" || section === "phone") && !canUpdate()) {
      setMessageBoxTitle("Update Restriction");
      setMessageBoxMessage(
        `You recently updated your ${
          state.userDetails.recentPhoneChange ? "phone number" : "email address"
        }. 
        You cannot update your phone number or email address within ${
          import.meta.env.VITE_CHANGE_DETECTION_MINUTES < 24 * 60
            ? `${import.meta.env.VITE_CHANGE_DETECTION_MINUTES} minutes`
            : `${Math.ceil(
                import.meta.env.VITE_CHANGE_DETECTION_MINUTES / (24 * 60)
              )} days`
        }
        days of the last update. Please contact your firm if necessary.`
      );
      setMessageBoxOpen(true);
      return;
    }
    setState((prevState) => ({
      ...prevState,
      updatingSection: section,
      otpSent: false,
      otpVerified: false,
      enteredOtp: "",
    }));
  };

  const handleSendEmailOtp = async () => {
    console.log("Sending Email OTP");
    let path = "otp/send-email-otp";
    console.log(state.userDetails.litigantAddress[0].EmailId);
    let requestBody = {
      email: state.EmailIdNew,
      incomingTransactionId: sessionStorage.getItem("TransactionId"),
      litigantId: state.userDetails.ID,
    };
    try {
      const response = await fetchWithAuth(path, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: requestBody, // Assuming `form` is the data to be sent
      });
      log.info(
        `Send Email OTP response: ${JSON.stringify(
          response
        )} and request body: ${JSON.stringify(requestBody)}`
      );
      if (response.success) {
        setState((prevState) => ({
          ...prevState,
          emailOtpSent: true,
          transactionIdKey: response.transactionIdKey,
        }));
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      handleError(
        error,
        `Send Email OTP for email: ${state.EmailIdNew} and litigant id: ${
          state.userDetails.ID
        } and transaction id: ${sessionStorage.getItem("TransactionId")}`,
        "Failed to send Email OTP. Please try again later."
      );
      setState((prevState) => ({
        ...prevState,
        emailOtpSent: false,
        emailOtpVerified: false,
        emailEnteredOtp: "",
        emailVerificationMessage: "Failed to send OTP",
      }));
    }
  };

  const handleVerifyEmailOtp = async () => {
    let path = "otp/verify-email-otp";
    console.log(state.userDetails.litigantAddress[0].EmailId);
    let requestBody = {
      transactionIdKey: state.transactionIdKey,
      litigantId: state.userDetails.ID,
      otp: state.emailEnteredOtp,
      transactionId: sessionStorage.getItem("TransactionId"),
    };
    try {
      //log.info(`Verify Email OTP request body: ${JSON.stringify(requestBody)}`);
      const response = await fetchWithAuth(path, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: requestBody, // Assuming `form` is the data to be sent
      });
      log.info(
        `Verify Email OTP response: ${JSON.stringify(
          response
        )} and request body: ${JSON.stringify(requestBody)}`
      );
      if (response.success) {
        setState((prevState) => ({
          ...prevState,
          emailOtpVerified: true,
          emailVerificationMessage: "✔ Email OTP Verified",
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          emailOtpVerified: false,
          emailVerificationMessage: "Incorrect OTP entered",
        }));
      }
    } catch (error) {
      handleError(
        error,
        `Verify Email OTP for litigant id: ${
          state.userDetails.ID
        } and transaction id: ${sessionStorage.getItem("TransactionId")}`,
        "Failed to verify Email OTP. Please try again later."
      );
      setState((prevState) => ({
        ...prevState,
        emailOtpVerified: false,
        emailVerificationMessage: "Incorrect OTP entered",
        emailOtpSent: false,
        emailEnteredOtp: "",
      }));
    }
  };

  const handleSendSmsOtp = async () => {
    console.log("Sending SMS OTP");
    let path = "otp/send-sms-otp";
    console.log(state.userDetails.litigantAddress[0].PhoneNo);
    let requestBody = {
      phoneNumber: state.PhoneNoNew,
      incomingTransactionId: sessionStorage.getItem("TransactionId"),
      litigantId: state.userDetails.ID,
    };
    try {
      const response = await fetchWithAuth(path, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: requestBody, // Assuming `form` is the data to be sent
      });
      log.info(
        `Send SMS OTP response: ${JSON.stringify(
          response
        )} and request body: ${JSON.stringify(requestBody)}`
      );
      if (response.success) {
        console.log("OTP sent successfully" + response);
        setState((prevState) => ({
          ...prevState,
          smsOtpSent: true,
          transactionIdKey: response.transactionIdKey,
        }));
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      handleError(
        error,
        `Send SMS OTP for phone number: ${state.PhoneNoNew} and litigant id: ${
          state.userDetails.ID
        } and transaction id: ${sessionStorage.getItem("TransactionId")}`,
        "Failed to send SMS OTP. Please try again later."
      );
      setState((prevState) => ({
        ...prevState,
        smsOtpSent: false,
        smsOtpVerified: false,
        smsEnteredOtp: "",
        smsVerificationMessage: "Something went wrong. Please try again later.",
      }));
    }
  };

  const handleVerifySmsOtp = async () => {
    let path = "otp/verify-sms-otp";
    console.log(state.userDetails.litigantAddress[0].PhoneNo);
    let requestBody = {
      transactionIdKey: state.transactionIdKey,
      litigantId: state.userDetails.ID,
      otp: state.smsEnteredOtp,
      transactionId: sessionStorage.getItem("TransactionId"),
    };
    try {
      const response = await fetchWithAuth(path, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: requestBody, // Assuming `form` is the data to be sent
      });
      log.info(
        `Verify SMS OTP response: ${JSON.stringify(
          response
        )} and request body: ${JSON.stringify(requestBody)}`
      );
      if (response.success) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          otp: "",
        }));
        setState((prevState) => ({
          ...prevState,
          smsOtpVerified: true,
          smsVerificationMessage: "✔ SMS OTP Verified",
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          smsOtpVerified: false,
          smsVerificationMessage: "Incorrect OTP entered",
        }));
      }
    } catch (error) {
      handleError(
        error,
        `Verify SMS OTP enteres otp: ${state.smsEnteredOtp} and litigant id: ${
          state.userDetails.ID
        } and transaction id: ${sessionStorage.getItem("TransactionId")}`,
        "Failed to verify SMS OTP. Please try again later."
      );
      setState((prevState) => ({
        ...prevState,
        smsOtpVerified: false,
        smsOtpSent: false,
        smsEnteredOtp: "",
        smsVerificationMessage: "Something went wrong. Please try again later.",
      }));
    }
  };

  const validateSocialMediaProfileLink = (name, value) => {
    let error = "";
    const handles = state.userDetails.litigantAddress[0].SocialMediaHandles;
    const index = parseInt(name.split("_")[1]);
    if (handles[index].handle !== "None") {
      if (!value) error = "Social media profile link is required.";
      //else if (!value.startsWith("https://")) error = "Social media profile link must start with https://";
    }
    return error;
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "FirstName":
        if (!value) error = "First name is required.";
        break;
      case "LastName":
        if (!value) error = "Last name is required.";
        break;
      case "EmailId":
        if (!value) error = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid.";
        break;
      case "EmailIdNew":
        if (state.updatingSection === "email") {
          if (!value) error = "Email is required.";
          else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid.";
          else if (value === state.userDetails.litigantAddress[0].EmailId)
            error =
              "New email address cannot be the same as the old email address";
        }
        break;
      case "PhoneNo":
        if (!value) error = "Phone number is required.";
        else if (!/^\d{10}$/.test(value)) error = "Phone number is invalid.";
        else if (value.length < 10) error = "Phone number should be 10 digits";
        break;
      case "PhoneNoNew":
        if (state.updatingSection === "phone") {
          if (!value) error = "Phone number is required.";
          else if (!/^\d{10}$/.test(value)) error = "Phone number is invalid.";
          else if (value.length < 10)
            error = "Phone number should be 10 digits";
          else if (value === state.userDetails.litigantAddress[0].PhoneNo)
            error =
              "New phone number cannot be the same as the old phone number";
        }
        break;
      case "otp":
        if (!value) error = "OTP is required.";
        else if (value.length !== 6) error = "OTP is invalid.";
        break;
      case "emailotp":
        if (!value) error = "OTP is required.";
        else if (value.length !== 6) error = "OTP is invalid.";
        break;
      case "EmergencyContactName":
        if (!value) error = "Emergency contact name is required.";
        break;
      case "EmergencyContactPhone":
        if (!value) error = "Emergency contact phone is required.";
        else if (!/^\d{10}$/.test(value))
          error = "Emergency contact phone is invalid.";
        else if (value.length < 10)
          error = "Emergency contact phone should be 10 digits";
        break;
      case "EmergencyContactEmail":
        if (!value) error = "Emergency contact email is required.";
        else if (!/\S+@\S+\.\S+/.test(value))
          error = "Emergency contact email is invalid.";
        break;

      // Add other field validations as needed
      default:
        break;
    }
    return error;
  };

  const handleNewParamsChange = (name, value) => {
    const error = validateField(name, value);
    const isFormValid = state.isFormValid ? (error ? false : true) : true;
    setState((prevState) => ({
      ...prevState,
      isFormValid: isFormValid,
      [name]: value,
    }));

    // Update validation errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (name, value) => {
    const error = validateField(name, value);
    const isFormValid = state.isFormValid ? (error ? false : true) : true;

    // Handle SMS consent changes in a single setState call
    setState((prevState) => {
      const baseUpdate = {
        ...prevState,
        isFormValid: isFormValid,
        userDetails: {
          ...prevState.userDetails,
          litigantAddress: [
            {
              ...prevState.userDetails.litigantAddress[0],
              [name]: value,
            },
          ],
        },
      };

      // If SMS consent is being turned off, reset related state
      if (name === "SmsConsent" && value === false) {
        console.log("SMS consent is being turned off");
        return {
          ...baseUpdate,
          smsOtpSent: false,
          smsOtpVerified: false,
          smsEnteredOtp: "",
          smsVerificationMessage: "",
          emailOtpSent: false,
          emailOtpVerified: false,
          emailEnteredOtp: "",
          emailVerificationMessage: "",
          updatingSection: null,
        };
      }

      return baseUpdate;
    });

    // Update validation errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("TransactionId");
    log.info(
      "User logged out due to inactivity" + JSON.stringify(state.userDetails.ID)
    );
    //alert("You have been logged out due to inactivity.");
    navigate("/InactiveSession");
  };

  const handleAddSocialMedia = () => {
    if (state.userDetails.address.socialMediaHandles) {
      setState((prevState) => ({
        ...prevState,
        userDetails: {
          ...prevState.userDetails,
          address: {
            ...prevState.userDetails.address,
            socialMediaHandles: [
              ...prevState.userDetails.address.socialMediaHandles,
              prevState.userDetails.currentHandle,
            ],
          },
          currentHandle: "",
        },
      }));
    }
  };

  const handleRemoveSocialMedia = (index) => {
    setState((prevState) => ({
      ...prevState,
      userDetails: {
        ...prevState.userDetails,
        litigantAddress: [
          {
            ...prevState.userDetails.litigantAddress[0],
            SocialMediaHandles:
              prevState.userDetails.litigantAddress[0].SocialMediaHandles.filter(
                (_, i) => i !== index
              ),
          },
        ],
      },
    }));
  };

  const collectErrorMessages = () => {
    return Object.values(errors).filter((error) => error !== "");
  };

  const validateAllFields = () => {
    const fieldsToValidate = [
      "EmailIdNew",
      "PhoneNoNew",
      "EmergencyContactName",
      "EmergencyContactPhone",
      "EmergencyContactEmail",
    ];
    const newErrors = {};
    if (state.smsOtpSent && !state.smsOtpVerified) {
      newErrors.otp = "Please verify the OTP before updating the phone number";
    }
    if (state.emailOtpSent && !state.emailOtpVerified) {
      newErrors.emailotp = "Please verify the OTP before updating the email";
    }
    if (
      state.userDetails.litigantAddress[0].SmsConsent === null ||
      state.userDetails.litigantAddress[0].SmsConsent === false
    ) {
      newErrors.smsConsent =
        "Please provide your consent to send SMS. This is purely for updates and we will never sell or share your data";
    }
    state.userDetails.litigantAddress[0].SocialMediaHandles.forEach(
      (handle, index) => {
        if (handle.handle === "") {
          newErrors.handle =
            "Please select one social media type, If you don't want to add any social media, select None";
        }
        if (handle.handle !== "None" && handle.link === "") {
          newErrors[`SocialMediaHandlesProfileLink_${index}`] =
            "Please enter the link for the social media";
        } //if (handle.handle !== "None" && !handle.link.startsWith("https://")) {
      }
    );

    fieldsToValidate.forEach((field) => {
      let value = "";
      if (field === "PhoneNoNew" || field === "EmailIdNew") {
        value = state[field];
      } else {
        value = state.userDetails.litigantAddress[0][field];
      }
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      {
        setState((prevState) => ({ ...prevState, isFormValid: false }));
      }
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateInformation = async () => {
    const isValid = validateAllFields();
    if (!isValid) {
      log.error(
        `Validation failed after clicking update button. Error: ${JSON.stringify(
          errors
        )}`
      );
      return;
    }

    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    console.log("Updating information");
    let path = "details/update-information";
    console.log(sessionStorage.getItem("TransactionId"));
    let changeNotificationParam = "";
    let updateDetails = { ...state.userDetails };
    if (state.smsOtpVerified) {
      changeNotificationParam = "Phone";
      updateDetails.litigantAddress[0].PhoneNo = state.PhoneNoNew;
    } else if (state.emailOtpVerified) {
      changeNotificationParam = "Email";
      updateDetails.litigantAddress[0].EmailId = state.EmailIdNew;
    }
    try {
      const response = await fetchWithAuth(path, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          userDetails: updateDetails,
          transactionId: sessionStorage.getItem("TransactionId"),
          changeNotificationParam: changeNotificationParam,
        },
      });
      log.info(
        `Update information response: ${JSON.stringify(
          response.data
        )} input details: ${JSON.stringify(updateDetails)}`
      );
      if (response.success) {
        navigate("/SaveSignout");
      } else {
        setMessageBoxTitle("Error");
        setMessageBoxMessage("Failed to update information. Please try again.");
        setMessageBoxOpen(true);
      }
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    } catch (error) {
      log.error(
        `Error occured while updating information: ${JSON.stringify(error)}`
      );
      setMessageBoxTitle("Error");
      setMessageBoxMessage(
        "Failed to update information. Please try again later."
      );
      setMessageBoxOpen(true);
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const handleCancelUpdation = () => {
    if (state.smsOtpSent || state.emailOtpSent) {
      (() => {
        setMessageBoxTitle("Cancel Update");
        setMessageBoxMessage(
          "Are you sure you want to cancel updating the information?"
        );
        setMessageBoxOpen(true);
        return false; // Return false initially, the actual confirmation will be handled by the MessageBox component
      })();
    } else {
      setState((prevState) => ({
        ...prevState,
        updatingSection: null,
      }));
    }
  };

  const renderUpdatingSection = () => {
    if (state.updatingSection === "phone") {
      return (
        <Box sx={{ mt: 2 }}>
          <LabeledTextField
            label="Cell Phone Number"
            name="PhoneNoNew"
            value={state.PhoneNoNew}
            onChange={(e) =>
              handleNewParamsChange("PhoneNoNew", e.target.value)
            }
            error={!!errors.PhoneNoNew}
            helperText={errors.PhoneNoNew}
            disabled={state.smsOtpVerified}
          />
          {!state.smsOtpSent ? (
            <Button
              variant="contained"
              onClick={handleSendSmsOtp}
              sx={{ backgroundColor: "rgb(42, 66, 63)", color: "white" }}
              disabled={
                !!errors.PhoneNoNew || !state.PhoneNoNew || state.smsOtpVerified
              }
              //disabled={state.smsOtpVerified}
            >
              Send OTP
            </Button>
          ) : (
            <React.Fragment>
              <LabeledTextField
                label="Enter OTP"
                name="otp"
                value={state.smsEnteredOtp}
                onChange={(e) => {
                  validateField("otp", e.target.value);
                  setState((prevState) => ({
                    ...prevState,
                    smsEnteredOtp: e.target.value,
                  }));
                }}
                disabled={state.smsOtpVerified}
                error={!!errors.otp}
                helperText={errors.otp}
              />

              <Button
                variant="contained"
                onClick={handleVerifySmsOtp}
                sx={{ backgroundColor: "rgb(42, 66, 63)", color: "white" }}
                disabled={state.smsOtpVerified}
              >
                Verify OTP
              </Button>
            </React.Fragment>
          )}

          {!state.smsOtpVerified && (
            <Button
              variant="Link"
              onClick={handleCancelUpdation}
              sx={{ ml: 2, backgroundColor: "rgb(42, 66, 63)", color: "white" }}
            >
              Cancel
            </Button>
          )}
          {state.smsOtpSent && !state.smsOtpVerified && (
            <ResendOtpTimer onResend={handleSendSmsOtp} />
          )}
          {state.smsVerificationMessage && (
            <Typography
              variant="body2"
              sx={{
                color: state.smsVerificationMessage.includes("✔")
                  ? "green"
                  : "orangered",
                mt: 1,
              }}
            >
              {state.smsVerificationMessage}
            </Typography>
          )}
        </Box>
      );
    } else if (state.updatingSection === "email") {
      return (
        <Box sx={{ mt: 2 }}>
          <LabeledTextField
            label="Email Address"
            name="EmailIdNew"
            value={state.EmailIdNew}
            onChange={(e) =>
              handleNewParamsChange("EmailIdNew", e.target.value)
            }
            error={!!errors.EmailIdNew}
            helperText={errors.EmailIdNew}
            disabled={state.emailOtpVerified}
          />
          {!state.emailOtpSent ? (
            <Button
              variant="contained"
              onClick={handleSendEmailOtp}
              sx={{ backgroundColor: "rgb(42, 66, 63)", color: "white" }}
              //disabled={state.emailOtpVerified}
              disabled={
                !!errors.EmailIdNew ||
                !state.EmailIdNew ||
                state.emailOtpVerified
              }
            >
              Send OTP
            </Button>
          ) : (
            <React.Fragment>
              <LabeledTextField
                label="Enter OTP"
                name="emailotp"
                value={state.emailEnteredOtp}
                onChange={(e) => {
                  validateField("emailotp", e.target.value);
                  setState((prevState) => ({
                    ...prevState,
                    emailEnteredOtp: e.target.value,
                  }));
                }}
                disabled={state.emailOtpVerified}
                error={!!errors.emailotp}
                helperText={errors.emailotp}
              />
              <Button
                variant="contained"
                onClick={handleVerifyEmailOtp}
                sx={{ backgroundColor: "rgb(42, 66, 63)", color: "white" }}
                disabled={state.emailOtpVerified}
              >
                Verify OTP
              </Button>
            </React.Fragment>
          )}
          {!state.emailOtpVerified && (
            <Button
              variant="Link"
              onClick={handleCancelUpdation}
              sx={{ ml: 2, backgroundColor: "rgb(42, 66, 63)", color: "white" }}
            >
              Cancel
            </Button>
          )}
          {state.emailOtpSent && !state.emailOtpVerified && (
            <ResendOtpTimer onResend={handleSendEmailOtp} />
          )}
          {state.emailVerificationMessage && (
            <Typography
              variant="body2"
              sx={{
                color: state.emailVerificationMessage.includes("✔")
                  ? "green"
                  : "orangered",
                mt: 1,
              }}
            >
              {state.emailVerificationMessage}
            </Typography>
          )}
        </Box>
      );
    } else if (state.updatingSection === "address") {
      return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={12}>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                border: "1px solid #e0e0e0",
              }}
            >
              To update your mailing address, please contact your law firm
              directly. Address changes must be verified and processed through
              official channels.
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Current Address:
            </Typography>
            <Typography variant="body1">
              {state.userDetails.litigantAddress[0].AddressLine1}
            </Typography>
            {state.userDetails.litigantAddress[0].AddressLine2 && (
              <Typography variant="body1">
                {state.userDetails.litigantAddress[0].AddressLine2}
              </Typography>
            )}
            <Typography variant="body1">
              {state.userDetails.litigantAddress[0].City},{" "}
              {state.userDetails.litigantAddress[0].State}{" "}
              {state.userDetails.litigantAddress[0].Zipcode}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              onClick={handleCancelUpdation}
              sx={{ mt: 2, backgroundColor: "rgb(42, 66, 63)", color: "white" }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      );
    }
    return null;
  };

  const handleCloseMessageBox = () => {
    setMessageBoxOpen(false);
    if (messageBoxTitle === "Cancel Update") {
      setState((prevState) => ({
        ...prevState,
        updatingSection: null,
        smsOtpSent: false,
        smsOtpVerified: false,
        smsEnteredOtp: "",
        smsVerificationMessage: "",
        emailOtpSent: false,
        emailOtpVerified: false,
        emailEnteredOtp: "",
        emailVerificationMessage: "",
        messageBoxTitle: "",
      }));
    }
  };

  const handleError = (error, customMessage, errorMessage) => {
    log.error(`Error occured while : ${customMessage} Error : ${error}`);
    //console.error("Error occured while :", customMessage, "Error :", error);
    setExceptionDialogOpen(true);
    setExceptionDialogMessage(errorMessage);
  };

  const handleSmsConsentChange = (e) => {
    const isChecked = e.target.checked;
    setState((prevState) => ({
      ...prevState,
      userDetails: {
        ...prevState.userDetails,
        litigantAddress: [
          {
            ...prevState.userDetails.litigantAddress[0],
            SmsConsent: isChecked,
          },
        ],
      },
    }));
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 4, px: 4, py: 2 }}>
      <ExceptionDialog
        open={exceptionDialogOpen}
        message={exceptionDialogMessage}
        onClose={() => setExceptionDialogOpen(false)}
      />
      {state.isLoading && <LoadingSpinner />}
      <MessageBox
        open={messageBoxOpen}
        onClose={handleCloseMessageBox}
        title={messageBoxTitle}
        message={messageBoxMessage}
      />
      {/* Display error messages at the top */}
      {!state.isFormValid && (
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

      {/* Add campaign image at the top of the personal information section */}

      {/* SMS Consent Section */}
      <Paper sx={{ mb: 4, p: 3 }} elevation={3}>
        <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
          SMS Consent – Why It's Necessary
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We want to make sure you don't miss anything important in your case.
          As deadlines approach—especially for filing claims, responding to
          settlement offers, and making key decisions—speed matters. Text
          messages allow us to reach you faster than email or mail when time is
          critical.
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={
                state.userDetails.litigantAddress[0]?.SmsConsent || false
              }
              onChange={handleSmsConsentChange}
              name="smsConsent"
              color="primary"
            />
          }
          label={
            <Typography variant="body1">
              I agree to receive SMS messages about my case.{" "}
              <Typography
                component="span"
                variant="body2"
                sx={{ fontStyle: "italic" }}
              >
                (You can reply STOP anytime to opt out, but doing so may delay
                important updates if there are any issues reaching you by other
                methods.)
              </Typography>
            </Typography>
          }
        />
        {!state.userDetails.litigantAddress[0]?.SmsConsent && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mt: 2, color: "red" }}>
              <strong>SMS Authorization Required for Contact Updates</strong>
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Because you have an{" "}
              <strong>existing business relationship </strong> with
              <strong> {state.LawFirmName} </strong>, the law firm using our
              system may send you SMS/text messages to provide important
              updates, notifications and requests for necessary information
              related to your legal case.
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>If you wish to update your contact information </strong>{" "}
              with the law firm using our system, we ask that you provide{" "}
              <strong>express consent </strong> to clarify that you understand
              that you will receive SMS notifications and so that we may
              immediately be sent to you. Keeping your contact information
              up-to-date ensures that you receive{" "}
              <strong>timely updates on important case matters</strong>,
              including
              <strong> settlement offers </strong> and other notifications or
              request for necessary information.
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Personal Information Section */}
      <Paper sx={{ mb: 4 }} elevation={3}>
        <Box sx={{ p: 3 }}>
          <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
            Update Your Contact Information
          </Typography>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Right now, we have the following contact details on file:
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                Cell Phone Number:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1, color: "grey" }}>
                {state.userDetails.litigantAddress[0]?.PhoneNo}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                Email:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1, color: "grey" }}>
                {state.userDetails.litigantAddress[0]?.EmailId}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                Mailing Address:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1, color: "grey" }}>
                {`${state.userDetails.litigantAddress[0]?.AddressLine1}, ${
                  state.userDetails.litigantAddress[0]?.AddressLine2
                    ? " " +
                      state.userDetails.litigantAddress[0]?.AddressLine2 +
                      ","
                    : " "
                }${state.userDetails.litigantAddress[0]?.City}, ${
                  state.userDetails.litigantAddress[0]?.State
                }, ${state.userDetails.litigantAddress[0]?.Zipcode}`}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Is anything outdated? Use the following buttons to update specific
            information, ensuring we can always reach you when needed.
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}
          >
            <Tooltip
              title={
                !state.userDetails.litigantAddress[0]?.SmsConsent
                  ? "You need to enable SMS consent to edit any of your details"
                  : ""
              }
              arrow
            >
              <span>
                <Button
                  variant="outlined"
                  onClick={() => handleUpdateButtonClick("phone")}
                  disabled={
                    (state.updatingSection &&
                      state.updatingSection !== "phone") ||
                    !state.userDetails.litigantAddress[0]?.SmsConsent
                  }
                  sx={{
                    backgroundColor:
                      (state.updatingSection &&
                        state.updatingSection !== "phone") ||
                      !state.userDetails.litigantAddress[0]?.SmsConsent
                        ? "lightgrey"
                        : "rgb(42, 66, 63)",
                    color: "white",
                  }}
                >
                  Update Phone Number
                </Button>
              </span>
            </Tooltip>

            <Tooltip
              title={
                !state.userDetails.litigantAddress[0]?.SmsConsent
                  ? "You need to enable SMS consent to edit any of your details"
                  : ""
              }
              arrow
            >
              <span>
                <Button
                  variant="outlined"
                  onClick={() => handleUpdateButtonClick("email")}
                  disabled={
                    (state.updatingSection &&
                      state.updatingSection !== "email") ||
                    !state.userDetails.litigantAddress[0]?.SmsConsent
                  }
                  sx={{
                    backgroundColor:
                      (state.updatingSection &&
                        state.updatingSection !== "email") ||
                      !state.userDetails.litigantAddress[0]?.SmsConsent
                        ? "lightgrey"
                        : "rgb(42, 66, 63)",
                    color: "white",
                  }}
                >
                  Update Email Address
                </Button>
              </span>
            </Tooltip>

            <Tooltip
              title={
                !state.userDetails.litigantAddress[0]?.SmsConsent
                  ? "You need to enable SMS consent to edit any of your details"
                  : ""
              }
              arrow
            >
              <span>
                <Button
                  variant="outlined"
                  onClick={() => handleUpdateButtonClick("address")}
                  disabled={
                    (state.updatingSection &&
                      state.updatingSection !== "address") ||
                    !state.userDetails.litigantAddress[0]?.SmsConsent
                  }
                  sx={{
                    backgroundColor:
                      (state.updatingSection &&
                        state.updatingSection !== "address") ||
                      !state.userDetails.litigantAddress[0]?.SmsConsent
                        ? "lightgrey"
                        : "rgb(42, 66, 63)",
                    color: "white",
                  }}
                >
                  Update Address
                </Button>
              </span>
            </Tooltip>
          </Box>

          {renderUpdatingSection()}
        </Box>
      </Paper>

      {/* Social Media and Emergency Contact Section */}
      <Paper sx={{ mb: 4 }} elevation={3}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
            Add Emergency Contact
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            If we are unable to reach you by phone or email, please provide
            alternate contact information. This is especially important in case
            your phone or email becomes unavailable for any reason.
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 2, fontStyle: "italic", color: "gray" }}
          >
            Emergency Contact: (Someone you trust who can pass along a message.)
          </Typography>
          <Grid container spacing={3}>
            <Grid size={4}>
              <LabeledTextField
                label="Emergency Contact Name"
                name="EmergencyContactName"
                disabled={!state.userDetails.litigantAddress[0]?.SmsConsent}
                value={
                  state.userDetails.litigantAddress[0]?.EmergencyContactName
                }
                onChange={(e) =>
                  handleChange("EmergencyContactName", e.target.value)
                }
                error={!!errors.EmergencyContactName}
                helperText={errors.EmergencyContactName}
              />
            </Grid>
            <Grid size={4}>
              <LabeledTextField
                label="Emergency Contact Phone"
                name="EmergencyContactPhone"
                disabled={!state.userDetails.litigantAddress[0]?.SmsConsent}
                value={
                  state.userDetails.litigantAddress[0]?.EmergencyContactPhone
                }
                onChange={(e) =>
                  handleChange("EmergencyContactPhone", e.target.value)
                }
                error={!!errors.EmergencyContactPhone}
                helperText={errors.EmergencyContactPhone}
              />
            </Grid>
            <Grid size={4}>
              <LabeledTextField
                label="Emergency Contact Email"
                name="EmergencyContactEmail"
                disabled={!state.userDetails.litigantAddress[0]?.SmsConsent}
                onChange={(e) =>
                  handleChange("EmergencyContactEmail", e.target.value)
                }
                value={
                  state.userDetails.litigantAddress[0]?.EmergencyContactEmail
                }
                error={!!errors.EmergencyContactEmail}
                helperText={errors.EmergencyContactEmail}
              />
            </Grid>

            <Grid size={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                Add Social Media Contact
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, fontStyle: "italic", color: "gray" }}
              >
                Social Media : (Only used if your phone & email stop
                working—never for marketing.) <br />
              </Typography>
            </Grid>
            {state.userDetails.litigantAddress[0]?.SocialMediaHandles?.map(
              (handle, index) => (
                <React.Fragment key={index}>
                  <Grid size={4}>
                    <StyledDropdown
                      label="Select Social Media"
                      name={`handle-${index}`}
                      disabled={
                        !state.userDetails.litigantAddress[0]?.SmsConsent
                      }
                      value={handle.handle}
                      onChange={(e) => {
                        setState((prevState) => {
                          let newHandles =
                            prevState.userDetails.litigantAddress[0]
                              .SocialMediaHandles;

                          newHandles[index].handle = e.target.value;
                          let isFormValid = true;
                          // Parse the JSON string if necessary
                          if (e.target.value === "None") {
                            newHandles[index].link = "";
                            isFormValid = true;
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              [`SocialMediaHandlesProfileLink_${index}`]: "",
                            }));
                          }
                          return {
                            ...prevState,
                            isFormValid: isFormValid,
                            userDetails: {
                              ...prevState.userDetails,
                              litigantAddress: [
                                {
                                  ...prevState.userDetails.litigantAddress[0],
                                  SocialMediaHandles: newHandles,
                                },
                              ],
                            },
                          };
                        });
                      }}
                      options={socialMediaOptions}
                    />
                  </Grid>
                  <Grid size={6}>
                    <LabeledTextField
                      label="Profile Link"
                      value={handle.link}
                      disabled={
                        !state.userDetails.litigantAddress[0]?.SmsConsent
                      }
                      error={!!errors[`SocialMediaHandlesProfileLink_${index}`]}
                      helperText={
                        errors[`SocialMediaHandlesProfileLink_${index}`]
                      }
                      onChange={(e) =>
                        setState((prevState) => {
                          const error = validateSocialMediaProfileLink(
                            `SocialMediaHandlesProfileLink_${index}`,
                            e.target.value
                          );
                          console.log(error);
                          const isFormValid = state.isFormValid
                            ? error
                              ? false
                              : true
                            : true;

                          // Parse the JSON string if necessary
                          const newHandles =
                            prevState.userDetails.litigantAddress[0]
                              .SocialMediaHandles;
                          newHandles[index].link = e.target.value;
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            [`SocialMediaHandlesProfileLink_${index}`]: error,
                          }));
                          return {
                            ...prevState,
                            isFormValid: isFormValid,
                            userDetails: {
                              ...prevState.userDetails,
                              litigantAddress: [
                                {
                                  ...prevState.userDetails.litigantAddress[0],
                                  SocialMediaHandles: newHandles,
                                },
                              ],
                            },
                          };
                        })
                      }
                      fullWidth
                    />
                  </Grid>
                  {index > 0 && (
                    <Grid size={2}>
                      <Button
                        variant="link"
                        onClick={() => handleRemoveSocialMedia(index)}
                        disabled={
                          !state.userDetails.litigantAddress[0]?.SmsConsent
                        }
                        sx={{ mt: "28px" }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  )}
                </React.Fragment>
              )
            )}
            <Grid size={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor:
                    (state.updatingSection &&
                      state.updatingSection !== "email") ||
                    !state.userDetails.litigantAddress[0]?.SmsConsent
                      ? "lightgrey"
                      : "rgb(42, 66, 63)",
                  color: "white",
                }}
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    userDetails: {
                      ...prevState.userDetails,
                      litigantAddress: [
                        {
                          ...prevState.userDetails.litigantAddress[0],
                          SocialMediaHandles: [
                            ...prevState.userDetails.litigantAddress[0]
                              .SocialMediaHandles,
                            { handle: "", link: "" },
                          ],
                        },
                      ],
                    },
                  }))
                }
              >
                +
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            {/*{state.userDetails.address.socialMediaHandles.map((handle, index) => (
              <Typography key={index} variant="body2">
                {handle}
              </Typography>
            ))}*/}
          </Box>
          <PrivacyNotice />
        </Box>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        disabled={
          !state.userDetails.litigantAddress[0]?.SmsConsent
          //||          !state.isFormValid
        }
        onClick={handleUpdateInformation}
        sx={{
          backgroundColor: !state.userDetails.litigantAddress[0]?.SmsConsent
            ? "lightgrey"
            : "rgb(42, 66, 63)",
        }}
      >
        UPDATE INFORMATION
      </Button>
      {!state.isFormValid && (
        <>
          <div style={{ height: "20px" }} />
          <Paper
            sx={{
              p: 2,
              //backgroundColor: "#fff8e1",
              border: "1px solid #ffd54f",
              borderRadius: "4px",
              mb: 2,
            }}
            elevation={1}
          >
            <Typography
              variant="body1"
              color="error"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <WarningIcon sx={{ mr: 1 }} />
              There are some errors on this page that need to be fixed before
              saving your information. Please review the error details at the
              top of the page.
            </Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{ mt: 1 }}
            >
              Scroll to error details
            </Button>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Details;
