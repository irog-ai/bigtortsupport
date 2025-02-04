import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Details from "./components/Details";
import Footer from "./components/Footer";
import Terms from "./components/Terms";
import PrivacyPolicy from "./components/PrivacyPolicy";


function App() {
  return (
    <div className="App" style={{ minWidth: '98.7vw', overflowX: 'hidden' }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Details" element={<Details />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>      
    
    </div>
  );
}

export default App;
