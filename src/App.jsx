import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Details from "./components/Details";
import Footer from "./components/Footer";
import Terms from "./components/Terms";
import PrivacyPolicy from "./components/PrivacyPolicy";
import LawFirmGetStarted from "./components/LawFirmGetStarted";
import Pricing from "./components/Pricing";
import Signout from "./components/Signout";
import InactiveSession from "./components/InactiveSession";
import SaveSignout from "./components/SaveSignout";

function App() {
  return (
    <div className="App" style={{ minWidth: "98.7vw", overflowX: "hidden" }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/GetStarted" element={<LawFirmGetStarted />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Details" element={<Details />} />
          <Route path="/Logout" element={<Signout />} />
          <Route path="/InactiveSession" element={<InactiveSession />} />
          <Route path="/SaveSignout" element={<SaveSignout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
