import React from "react";
import { Box, Button, Typography } from "@mui/material";
import LabeledTextField from "../UIComponents/LabeledTextField";

const UpdatingSection = ({
  state,
  setState,
  errors,
  setErrors,
  handleChange,
  handleSendSmsOtp,
  handleVerifySmsOtp,
  handleSendEmailOtp,
  handleVerifyEmailOtp,
  handleCancelUpdation,
}) => {
  if (state.updatingSection === "phone") {
    return (
      <Box sx={{ mt: 2 }}>
        <LabeledTextField
          label="Cell Phone Number"
          name="PhoneNo"
          value={state.userDetails.litigantAddress[0].PhoneNo}
          onChange={handleChange}
          error={!!errors.PhoneNo}
          helperText={errors.PhoneNo}
        />
        {!state.smsOtpSent ? (
          <Button variant="contained" onClick={handleSendSmsOtp}>
            Send OTP
          </Button>
        ) : (
          <Box sx={{ mt: 2 }}>
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
              disabled={state.smsOtpVerified}
            >
              Verify OTP
            </Button>
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
        )}
        <Button variant="Link" onClick={handleCancelUpdation}>
          Cancel
        </Button>
      </Box>
    );
  } else if (state.updatingSection === "email") {
    return (
      <Box sx={{ mt: 2 }}>
        <LabeledTextField
          label="Email Address"
          name="EmailId"
          value={state.userDetails.litigantAddress[0].EmailId}
          onChange={handleChange}
          error={!!errors.EmailId}
          helperText={errors.EmailId}
        />
        {!state.emailOtpSent ? (
          <Button variant="contained" onClick={handleSendEmailOtp}>
            Send OTP
          </Button>
        ) : (
          <Box sx={{ mt: 2 }}>
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
              disabled={state.emailOtpVerified}
            >
              Verify OTP
            </Button>
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
        )}
      </Box>
    );
  } else if (state.updatingSection === "address") {
    return (
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <LabeledTextField
            label="Mailing Address Line 1"
            name="addressLine1"
            value={state.userDetails.address.addressLine1}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <LabeledTextField
            label="Mailing Address Line 2"
            name="addressLine2"
            value={state.userDetails.address.addressLine2}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <LabeledTextField
            label="City"
            name="city"
            value={state.userDetails.address.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <LabeledTextField
            label="State"
            name="state"
            value={state.userDetails.address.state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <LabeledTextField
            label="Zip Code"
            name="zipCode"
            value={state.userDetails.address.zipcode}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    );
  }
  return null;
};

export default UpdatingSection;