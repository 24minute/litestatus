import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/allcategory.css";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch categories when the component mounts or search query changes
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/category?q=${searchQuery}`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [searchQuery]);

  // Handle category deletion
  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/category/${categoryId}`
      );
      if (response.status === 200) {
        // Update the categories list by removing the deleted category
        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="all-category">
      <Header title="Categories" />
      <Controls searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CategoryTable
        categories={categories}
        onDeleteCategory={deleteCategory}
      />
    </div>
  );
};

const Header = ({ title }) => <h1>{title}</h1>;

// Controls for search functionality
const Controls = ({ searchQuery, setSearchQuery }) => (
  <div className="controls">
    <input
      type="text"
      placeholder="Search categories..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)} // Update search query
      className="search-input"
    />
  </div>
);

// Category table displaying category data
const CategoryTable = ({ categories, onDeleteCategory }) => (
  <div className="category-table-container">
    <table className="category-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              onDeleteCategory={onDeleteCategory}
            />
          ))
        ) : (
          <tr>
            <td colSpan="3" className="no-data">
              No categories found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// Category row for displaying individual category
const CategoryRow = ({ category, onDeleteCategory }) => (
  <tr>
    <td>{category.title}</td>
    <td>
      {category.image ? (
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${category.image}`}
          alt={category.title}
          className="category-image"
        />
      ) : (
        "No Image"
      )}
    </td>
    <td className="actions">
      <button
        onClick={() => onDeleteCategory(category.id)}
        className="delete-btn"
      >
        Delete Category
      </button>
      <StatusList categoryId={category.id} />
    </td>
  </tr>
);

// Status list and deletion for each category
const StatusList = ({ categoryId }) => {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/category/${categoryId}/status`
        );
        setStatuses(response.data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };

    fetchStatuses();
  }, [categoryId]);

  const deleteStatus = async (statusId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/status/${statusId}`);
      setStatuses(statuses.filter((status) => status.statusId !== statusId));
    } catch (error) {
      console.error("Error deleting status:", error);
    }
  };

  return (
    <div>
      {statuses.length > 0 ? (
        <ul className="status-list">
          {statuses.map((status) => (
            <li key={status.statusId}>
              {status.statusTitle}
              <button
                onClick={() => deleteStatus(status.statusId)}
                className="delete-status-btn"
              >
                Delete Status
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No statuses available.</p>
      )}
    </div>
  );
};

export default AllCategory;
