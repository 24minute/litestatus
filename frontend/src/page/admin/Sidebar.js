import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar open">
      <ul>
        <li>
          <NavLink to="/admin">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/addstatus">Add Status</NavLink>
        </li>
        <li>
          <NavLink to="/admin/allstatus">All Category</NavLink>
        </li>
        <li>
          <NavLink to="/admin/users">Users</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
