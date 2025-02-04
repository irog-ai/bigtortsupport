import React from 'react';
import '../styles/main.css';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate(); 

  const closeMenu = () => {
    document.querySelector('body').classList.remove('mobile-menu-open')
  }
  
  const handleButtonClick = (event, route) => {
    navigate(route);
    closeMenu();
    if(event!=null)event.preventDefault();
  };

  return (
    <>
      <footer id="page-footer">
        <div id="page-footer--inner-container" className="page-content-container">
          <nav id="footer-nav">
            <ul>
              {/*
              <li>
                <a href="/contactus" onClick={(e) => handleButtonClick(e, "/contactus")}>Contact Us</a>
              </li>
              */}
              <li>
                <a href="/privacypolicy" onClick={(e) => handleButtonClick(e, "/privacypolicy")}>Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" onClick={(e) => handleButtonClick(e, "/terms")}>Terms & Conditions</a>
              </li>
            </ul>
          </nav>
          <div id="footer-copyright">&copy; 2025 CG Legal Technologies, LLC</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;