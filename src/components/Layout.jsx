import React from "react";
import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Banner />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
