import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";

const ContactInformationSection = ({ state, setState, handleUpdateButtonClick }) => {
  return (
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
          <Button
            variant="outlined"
            onClick={() => handleUpdateButtonClick("phone")}
            disabled={
              state.updatingSection && state.updatingSection !== "phone"
            }
            sx={{ backgroundColor: "rgb(42, 66, 63)", color: "white" }}
          >
            Update Phone Number
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleUpdateButtonClick("email")}
            disabled={
              state.updatingSection && state.updatingSection !== "email"
            }
            sx={{
              backgroundColor:
                state.updatingSection && state.updatingSection !== "email"
                  ? "lightgrey"
                  : "rgb(42, 66, 63)",
              color: "white",
            }}
          >
            Update Email Address
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleUpdateButtonClick("address")}
            disabled={
              state.updatingSection && state.updatingSection !== "address"
            }
            sx={{
              backgroundColor:
                state.updatingSection && state.updatingSection !== "address"
                  ? "lightgrey"
                  : "rgb(42, 66, 63)",
              color: "white",
            }}
          >
            Update Address
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ContactInformationSection;