import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/addstatus.css";

const AddStatus = () => {
  const [newCategory, setNewCategory] = useState({ title: "", image: null });
  const [newStatus, setNewStatus] = useState({ categoryId: "", title: "", image: null });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChangeCategory = (e) => {
    setNewCategory({ ...newCategory, image: e.target.files[0] });
  };

  const handleInputChangeCategory = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newCategory.title);
    if (newCategory.image) {
      formData.append("image", newCategory.image);
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/category`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewCategory({ title: "", image: null });
      alert("Category created successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Error creating category");
    }
  };

  const handleFileChangeStatus = (e) => {
    setNewStatus({ ...newStatus, image: e.target.files[0] });
  };

  const handleInputChangeStatus = (e) => {
    const { name, value } = e.target;
    setNewStatus({ ...newStatus, [name]: value });
  };

  const handleSubmitStatus = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryId", newStatus.categoryId);
    formData.append("title", newStatus.title);
    if (newStatus.image) {
      formData.append("image", newStatus.image);
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/status`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewStatus({ categoryId: "", title: "", image: null });
      alert("Status posted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error posting status:", error);
      alert("Error posting status");
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-grid">
        {/* Add New Category */}
        <div className="form-container">
          <h2 className="form-title">Create New Category</h2>
          <form className="category-form" onSubmit={handleSubmitCategory}>
            <div className="form-field">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newCategory.title}
                onChange={handleInputChangeCategory}
                placeholder="Enter category title"
                required
              />
            </div>
            <div className="form-field">
              <label>Image:</label>
              <input type="file" onChange={handleFileChangeCategory} />
            </div>
            <button className="btn-submit" type="submit">
              Create Category
            </button>
          </form>
        </div>

        {/* Post New Status */}
        <div className="form-container">
          <h2 className="form-title">Post New Status</h2>
          <form className="status-form" onSubmit={handleSubmitStatus}>
            <div className="form-field">
              <label>Select Category:</label>
              <select
                name="categoryId"
                value={newStatus.categoryId}
                onChange={handleInputChangeStatus}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label>Status Title:</label>
              <input
                type="text"
                name="title"
                value={newStatus.title}
                onChange={handleInputChangeStatus}
                placeholder="Enter status title"
                required
              />
            </div>
            <div className="form-field">
              <label>Image:</label>
              <input type="file" onChange={handleFileChangeStatus} />
            </div>
            <button className="btn-submit" type="submit">
              Post Status
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStatus;
