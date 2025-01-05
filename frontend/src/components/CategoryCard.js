import React from "react";
import "./styles/categorycard.css";

const CategoryCard = ({ category }) => (
  <div className="category-card">
    <a href={`/category/${category.id}/status`} className="category-link">
      <div className="image-container">
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${category.image}`}
          alt={category.title}
          className="category-card-image"
        />
        <div className="text-overlay">{category.title}</div>
      </div>
    </a>
  </div>
);

export default CategoryCard;
