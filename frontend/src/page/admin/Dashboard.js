import React, { useState } from "react";
import axios from "axios";
import "./styles/dashboard.css";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    // Send data to the server using Axios
    axios
      .post(`${process.env.REACT_APP_API_URL}/addData`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Data inserted successfully");
      })
      .catch((error) => {
        console.error("There was an error adding the data!", error);
        alert("Error inserting data");
      });
  };

  return (
    <div className="dashboard">
      <h2>Add Data</h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="News">News</option>
            <option value="Sport">Sport</option>
            <option value="Business">Business</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="Movie">Movie</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Viral">Viral</option>
          </select>
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Dashboard;
