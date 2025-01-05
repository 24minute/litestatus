import React, { useEffect, useState } from "react";
import "./styles/newspage.css"; // Make sure to style this component
import axios from "axios";
import { useParams } from "react-router-dom";

const NewsPage = () => {
  const { id } = useParams(); // Get article ID from URL
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch article details from the server
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Make a GET request to fetch article details by ID
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles/${id}`);
        setArticle(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching the article:", error);
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // If loading, display loading message
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  // If article is not found, display error message
  if (!article) {
    return <div className="error">Article not found.</div>;
  }

  return (
    <div className="news-page">
      <div className="article-card">
        <h1 className="article-title">{article.title}</h1>
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${article.image}`} // Assuming images are stored under "uploads" directory
          alt={article.title}
          className="article-image"
        />
        <p className="article-description">{article.description}</p>
      </div>
    </div>
  );
};

export default NewsPage;
