import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../page/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import AboutUs from "../page/AboutUs";
import Privacy from "../page/Privacy";
import Terms from "../page/Terms";
import ContactUs from "../page/ContactUs";
import NewsPage from "../page/NewsPage";
import Status from "../page/Status";
import CategoryList from "../components/CategoryList";
import ArticlesList from "../components/ArticlesList";

const UserRoutes = () => {
  const location = useLocation();

  // Define routes where Header and Footer should be hidden
  const hideHeaderFooterRoutes = ["/category/:id/status"];

  // Check if the current route matches one of the hide routes
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.some((route) =>
    location.pathname.match(new RegExp(`^${route.replace(":id", "\\d+")}$`))
  );

  return (
    <div>
      {/* Conditionally render Header */}
      {!shouldHideHeaderFooter && <Header />}
      <div style={{ marginTop: shouldHideHeaderFooter ? "0" : "92px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/articles/:id" element={<NewsPage />} />

          <Route path="/news" element={<ArticlesList category="News" />} />
          <Route path="/sport" element={<ArticlesList category="Sport" />} />
          <Route
            path="/business"
            element={<ArticlesList category="Business" />}
          />
          <Route
            path="/lifestyle"
            element={<ArticlesList category="Lifestyle" />}
          />
          <Route path="/movie" element={<ArticlesList category="Movie" />} />
          <Route
            path="/entertainment"
            element={<ArticlesList category="Entertainment" />}
          />
          <Route path="/viral" element={<ArticlesList category="Viral" />} />

          {/* Status */}
          <Route path="/category" element={<CategoryList />} />
          <Route path="/category/:id/status" element={<Status />} />
        </Routes>
      </div>
      {/* Conditionally render Footer */}
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
};

export default UserRoutes;
