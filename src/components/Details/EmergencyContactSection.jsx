import React from "react";
import { Paper, Box, Typography, Grid, Button } from "@mui/material";
import LabeledTextField from "../UIComponents/LabeledTextField";
import StyledDropdown from "../UIComponents/StyledDropdown";

const EmergencyContactSection = ({ state, setState }) => {
  const socialMediaOptions = [
    "Facebook",
    "Twitter",
    "LinkedIn",
    "Instagram",
    "None",
  ];

  return (
    <Paper sx={{ mb: 4 }} elevation={3}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
          Add Emergency Contact & Social Media
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
              value={
                state.userDetails.litigantAddress[0]?.EmergencyContactName
              }
              onChange={handleChange}
              error={!!errors.EmergencyContactName}
              helperText={errors.EmergencyContactName}
            />
          </Grid>
          <Grid size={4}>
            <LabeledTextField
              label="Emergency Contact Phone"
              name="EmergencyContactPhone"
              value={
                state.userDetails.litigantAddress[0]?.EmergencyContactPhone
              }
              onChange={handleChange}
              error={!!errors.EmergencyContactPhone}
              helperText={errors.EmergencyContactPhone}
            />
          </Grid>
          <Grid size={4}>
            <LabeledTextField
              label="Emergency Contact Email"
              name="EmergencyContactEmail"
              onChange={handleChange}
              value={
                state.userDetails.litigantAddress[0]?.EmergencyContactEmail
              }
              error={!!errors.EmergencyContactEmail}
              helperText={errors.EmergencyContactEmail}
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
          {state.userDetails.litigantAddress[0]?.SocialMediaHandles?.map(
            (handle, index) => (
              <React.Fragment key={index}>
                <Grid size={4}>
                  <StyledDropdown
                    label="Select Social Media"
                    name={`handle-${index}`}
                    value={handle.handle}
                    onChange={(e) =>
                      setState((prevState) => {
                        const newHandles =
                          prevState.userDetails.litigantAddress[0]
                            .SocialMediaHandles;
                        newHandles[index].handle = e.target.value;
                        return {
                          ...prevState,
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
                    options={socialMediaOptions}
                  />
                </Grid>
                <Grid size={6}>
                  <LabeledTextField
                    label="Profile Link"
                    value={handle.link}
                    onChange={(e) =>
                      setState((prevState) => {
                        const newHandles =
                          prevState.userDetails.litigantAddress[0]
                            .SocialMediaHandles;
                        newHandles[index].link = e.target.value;
                        return {
                          ...prevState,
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
              sx={{ backgroundColor: "rgb(42, 66, 63)", color: "white" }}
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
      </Box>
    </Paper>
  );
};

export default EmergencyContactSection;