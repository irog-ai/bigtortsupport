import React from "react";
import { Paper, Typography, FormControlLabel, Checkbox } from "@mui/material";

const ConsentSection = ({ state, setState }) => {
  return (
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
            checked={state.userDetails.litigantAddress[0]?.SmsConsent}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                userDetails: {
                  ...prevState.userDetails,
                  litigantAddress: [
                    {
                      ...prevState.userDetails.litigantAddress[0],
                      SmsConsent: e.target.checked,
                    },
                  ],
                },
              }))
            }
            name="SmsConsent"
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
  );
};

export default ConsentSection;