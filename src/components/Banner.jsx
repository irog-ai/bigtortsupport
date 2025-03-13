import React, { useEffect } from "react";
import "../styles/main.css"; // Import a CSS file for styling
import logo from "../assets/bigtortsupportlogo.png"; // Adjust the import according to your actual file type
import { AppBar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Banner = (props) => {
  const location = useLocation();
  let buttonType = props.buttonType;
  console.log(buttonType);
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener("click", hideDropdown);
    return () => {
      document.removeEventListener("click", hideDropdown);
    };
  });

  const toggleDropdown = () => {
    const loggedInElement = document.getElementById("page-header--logged-in");
    if (!loggedInElement) return;
    if (loggedInElement.classList.contains("dropdown-visible")) {
      loggedInElement.classList.remove("dropdown-visible");
    } else {
      loggedInElement.classList.add("dropdown-visible");
    }
  };

  const hideDropdown = (event) => {
    const loggedInElement = document.getElementById("page-header--logged-in");
    if (!loggedInElement) return;
    if (!loggedInElement.contains(event.target)) {
      if (loggedInElement.classList.contains("dropdown-visible")) {
        loggedInElement.classList.remove("dropdown-visible");
      }
    }
  };

  const toggleMenu = () => {
    if (document.querySelector("body").classList.contains("mobile-menu-open")) {
      document.querySelector("body").classList.remove("mobile-menu-open");
    } else {
      document.querySelector("body").classList.add("mobile-menu-open");
    }
  };

  const closeMenu = () => {
    document.querySelector("body").classList.remove("mobile-menu-open");
  };

  const handleButtonClick = (event, route) => {
    navigate(route);
    closeMenu();
    if (event != null) event.preventDefault();
  };
  return (
    <>
      <div id="page-overlay"></div>
      <header id="page-header" className="header">
        <div
          id="page-header--inner-container"
          className="page-content-container"
        >
          {location?.state?.campaignImage && (
            <img 
              src={location.state.campaignImage} 
              alt="Campaign Logo" 
              style={{marginRight: "20px"}}
            />
          )}
          <a onClick={(e) => handleButtonClick(e, "/")} id="page-header--logo">
            <img src={logo} />
          </a>
          <nav id="page-header--nav">
            <ul id="page-header--nav-desktop">
              {/* <li><a href="/login" onClick={(e) => handleButtonClick(e, "/Login")}><span>Log In</span></a></li> */}
              <li id="page-header--cta">
                {buttonType === "getStarted" && (
                  <a
                    onClick={(e) => handleButtonClick(e, "/")}
                    id="page-header--logo"
                    style={{
                      //border: "1px solid #000",
                      //borderRadius: "1px",
                      padding: "8px 16px",
                      marginRight: "20px",
                      cursor: "pointer"
                    }}
                  >
                    Get Started
                  </a>
                )}
                {buttonType === "signout" && (
                  <a
                    onClick={(e) => handleButtonClick(e, "/Logout")}
                    id="page-header--logo"
                    style={{
                      //border: "1px solid #000",
                      //borderRadius: "4px", 
                      padding: "8px 16px",
                      marginRight: "20px",
                      cursor: "pointer"
                    }}
                  >
                    Log Out
                  </a>
                )}
              </li>
              {/*<li id="page-header--logged-in" onClick={toggleDropdown}>
                <span><div className="profile-circle"></div><span id="page-header--user-name">Firstname Lastname</span></span>
                <div id="page-header--account-dropdown">
                  <div id="page-header--account-dropdown-arrow"></div>
                  <div id="page-header--account-dropdown-container">
                    <ul>
                      <li><a href="/">Dashboard</a></li>
                      <li><a href="/">Log out</a></li>
                    </ul>
                  </div>
                </div>
              </li>*/}
            </ul>
            <div id="page-header--nav-mobile">
              <button
                id="page-header--menu-icon"
                className="page-header--menu-icon-open"
              >
                <div
                  id="page-header--menu-icon-line-1"
                  className="page-header--menu-icon-line"
                ></div>
                <div
                  id="page-header--menu-icon-line-2"
                  className="page-header--menu-icon-line"
                ></div>
                <div
                  id="page-header--menu-icon-line-3"
                  className="page-header--menu-icon-line"
                ></div>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Banner;
