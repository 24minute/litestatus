import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../services/PrivateRoute";
import Dashboard from "../page/admin/Dashboard";
import Sidebar from "../page/admin/Sidebar";
import "./admin.css";

const AdminRoutes = () => {
  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-content">
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute element={<Dashboard />} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;
