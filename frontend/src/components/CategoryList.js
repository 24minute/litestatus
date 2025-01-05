import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/categorylist.css";
import CategoryCard from "./CategoryCard";

const CategoryList = () => {
  const [category, setCategory] = useState([]); // State for categories
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Function to fetch categories based on search query
  const fetchCategories = async (query = "") => {
    try {
      // Send search query to backend via query parameter 'q'
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/category`, {
        params: { q: query }, // Pass query as parameter to filter categories
      });
      setCategory(response.data); // Update state with filtered categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch categories initially (empty search)
  useEffect(() => {
    fetchCategories(); // Fetch all categories initially
  }, []);


  
  // Handle changes in search input
  const handleSearchChange = (event) => {
    const query = event.target.value; // Get the search term
    setSearchTerm(query); // Update search term in state
    fetchCategories(query); // Fetch categories with the updated query
  };

  return (
    <div className="status-list-container">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearchChange} // Trigger search on input change
          className="search-bar"
        />
      </div>
      <h1 className="status-list-header">Active Status</h1>
      <div className="status-list-horizontal">
        {category.length > 0 ? (
          category.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <p className="no-status-message">No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
