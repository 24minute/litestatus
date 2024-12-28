import React from "react";
import Header from "../components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import AboutUs from "../page/AboutUs";
import Privacy from "../page/Privacy";
import Terms from "../page/Terms";
import ContactUs from "../page/ContactUs";
import Footer from "../components/Footer";
import NewsPage from "../page/NewsPage";

const UserRoutes = () => {


  return (
    <div>
      <Header />
      <div style={{ marginTop: "92px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/articles/:id" element={<NewsPage />} />
       
       
        </Routes>
      </div>

      {/* Conditionally render Footer based on the route */}
      <Footer/>

    </div>
  );
};

export default UserRoutes;
