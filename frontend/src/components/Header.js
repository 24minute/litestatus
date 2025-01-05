import React from "react";
import { Link } from "react-router-dom";
import "./styles/header.css";
import logo from ".././image/logo.png"
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="header">
      {/* Logo on the left */}
      <div className="header-container">
        <Link to="/" className="logo">
         <img src={logo} alt="logo"/>
        </Link>
   
      </div>

      {/* Navbar on the right */}
      <div className="navbar">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
