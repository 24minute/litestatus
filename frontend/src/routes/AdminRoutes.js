import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../services/PrivateRoute";
import Dashboard from "../page/admin/Dashboard";
import Sidebar from "../page/admin/Sidebar";
import "./admin.css";
import AddStatus from "../page/admin/AddStatus";
import User from "../page/admin/User";
import AllCategory from "../page/admin/AllCategory";

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
          <Route path="/addstatus" element={<AddStatus />}></Route>
          <Route path="/users" element={<User />}></Route>
          <Route path="/allstatus" element={<AllCategory />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;
