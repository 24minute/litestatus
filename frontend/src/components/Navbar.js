import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles/navbar.css"; // New styling for this design

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <button className="close-menu" onClick={closeMenu}>
            &times;
          </button>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              onClick={closeMenu}
            >
              News
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sport"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              onClick={closeMenu}
            >
              Sport
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/business"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              onClick={closeMenu}
            >
              Business
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lifestyle"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              onClick={closeMenu}
            >
              Lifestyle
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movie"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              onClick={closeMenu}
            >
              Movie
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/entertainment"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              onClick={closeMenu}
            >
              Entertainment
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/viral"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              onClick={closeMenu}
            >
              Viral
            </NavLink>
          </li>
        </ul>
        <li>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              onClick={closeMenu}
            >
              Highlights
            </NavLink>
          </li>
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
