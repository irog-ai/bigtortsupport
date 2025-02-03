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
} from "@mui/material";
import LabeledTextField from "./UIComponents/LabeledTextField";
import StyledDropdown from "./UIComponents/StyledDropdown";
import PrivacyNotice from "./UIComponents/PrivacyNotice";

const Details = () => {
  useEffect(() => {
    document.title = "Details - Bigtortsupport.ai";
  }, []);
  const [userDetails, setUserDetails] = useState({
    firstName: "John",
    middleName: "A.",
    lastName: "Doe",
    phoneNumber: "5435435435",
    email: "john.doe@gmail.com",
    addressLine1: "123 Elm Street",
    addressLine2: "Apt 4B",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactEmail: "",
    socialMediaHandles: [],
    currentHandle: "",
    smsConsent: false,
  });

  const socialMediaOptions = ["Facebook", "Twitter", "LinkedIn", "Instagram"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleAddSocialMedia = () => {
    if (userDetails.currentHandle) {
      setUserDetails({
        ...userDetails,
        socialMediaHandles: [
          ...userDetails.socialMediaHandles,
          userDetails.currentHandle,
        ],
        currentHandle: "",
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 4, px: 4, py: 2 }}>
      <PrivacyNotice />
      <div style={{ height: "20px" }} />
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
              checked={userDetails.smsConsent}
              onChange={(e) =>
                setUserDetails({ ...userDetails, smsConsent: e.target.checked })
              }
              name="smsConsent"
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
              <Typography variant="body1" sx={{ ml: 1, color:"grey"}}>
                {userDetails.phoneNumber}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                Email:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 ,color:"grey" }}>
                {userDetails.email}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                Mailing Address:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1, color:"grey" }}>
                {`${userDetails.addressLine1}, ${userDetails.addressLine2}, ${userDetails.city}, ${userDetails.state}, ${userDetails.zipCode}`}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body1"
            sx={{ mb: 2 }}
          >
            Is anything outdated? Enter any updates below so we can always reach
            you when needed. Keeping your information current helps prevent
            delays in processing your claim and ensures you receive all critical
            updates about your case.
          </Typography>
          <Grid container spacing={3}>
            <Grid size={4}>
              <LabeledTextField
                label="Cell Phone Number"
                name="phoneNumber"
                value={userDetails.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={8}>
              <LabeledTextField
                label="Email Address"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <LabeledTextField
                label="Mailing Address Line 1"
                name="addressLine1"
                value={userDetails.addressLine1}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <LabeledTextField
                label="Mailing Address Line 2"
                name="addressLine2"
                value={userDetails.addressLine2}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <LabeledTextField
                label="City"
                name="city"
                value={userDetails.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <LabeledTextField
                label="State"
                name="state"
                value={userDetails.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <LabeledTextField
                label="Zip Code"
                name="zipCode"
                value={userDetails.zipCode}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Social Media and Emergency Contact Section */}
      <Paper sx={{ mb: 4 }} elevation={3}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
            Add Social Media & Emergency Contact
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
                name="emergencyContactName"
                value={userDetails.emergencyContactName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <LabeledTextField
                label="Emergency Contact Phone"
                name="emergencyContactPhone"
                value={userDetails.emergencyContactPhone}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={4}>
              <LabeledTextField
                label="Emergency Contact Email"
                name="emergencyContactEmail"
                onChange={handleChange}
                value={userDetails.emergencyContactEmail}
              />
            </Grid>
            <Grid size={12}>
              <Typography
                variant="body2"
                sx={{ mb: 2, fontStyle: "italic", color: "gray" }}
              >
                Social Media : (Only used if your phone & email stop
                working—never for marketing.) <br />
              </Typography>
            </Grid>
            <Grid size={4}>
              <StyledDropdown
                label="Select Social Media"
                name="currentHandle"
                value={userDetails.currentHandle}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    currentHandle: e.target.value,
                  })
                }
                options={socialMediaOptions}
              />
            </Grid>
            <Grid size={6}>
              <LabeledTextField
                label="Profile Link"
                value={userDetails.currentHandle}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    currentHandle: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "rgb(42, 66, 63)" }}
                color="primary"
                onClick={handleAddSocialMedia}
              >
                Add Social Media
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            {userDetails.socialMediaHandles.map((handle, index) => (
              <Typography key={index} variant="body2">
                {handle}
              </Typography>
            ))}
          </Box>
          <PrivacyNotice />
        </Box>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddSocialMedia}
        sx={{ backgroundColor: "rgb(42, 66, 63)" }}
      >
        UPDATE INFORMATION
      </Button>
    </Box>
  );
};

export default Details;
