import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import Banner from "./Banner";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  console.log(location.pathname);
  let buttonType;
  let incomingpath = location.pathname.toLowerCase();
  if (incomingpath === "/login" || incomingpath === "/logout" || incomingpath === "/inactiveSession") {
    buttonType = null; // No button
  } else if (incomingpath === "/details") {
    buttonType = "signout"; // Signout button
  } else {
    buttonType = "getStarted"; // Default Get Started button
  }
  return (
    <>
      <MobileMenu />
      <div id="page-container">
        <Banner buttonType={buttonType} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

