import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import Banner from "./Banner";
import Footer from "./Footer";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <>
      <MobileMenu />
      <div id="page-container">
        <Banner />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
