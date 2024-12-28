import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/admin">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/addarticles">Add Status</NavLink>
        </li>
       
      </ul>
    </div>
  );
};

export default Sidebar;
