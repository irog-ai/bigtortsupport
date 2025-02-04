import React from 'react';
import '../styles/main.css';

const MobileMenu = () => {
  return (
    <>
      <nav id="mobile-menu--container">
        <div id="mobile-menu--container-inner">
          <div id="mobile-menu--close-button">
            <button id="mobile-menu--menu-icon" className="page-header--menu-icon-open">
              <div id="mobile-menu--menu-icon-line-1" className="page-header--menu-icon-line"></div>
              <div id="mobile-menu--menu-icon-line-2" className="page-header--menu-icon-line"></div>
              <div id="mobile-menu--menu-icon-line-3" className="page-header--menu-icon-line"></div>
            </button>
          </div>
          <ul>
            <span id="mobile-menu--user-name">Firstname Lastname</span>
            <hr/>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/">Log out</a></li>
            <hr/>
            <li><a href="/"><span>Home</span></a></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;