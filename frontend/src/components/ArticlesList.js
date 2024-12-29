import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/articleslist.css";

const ArticlesList = ({category}) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/articles", {params: {category}})
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the articles", error);
      });
  }, [category]);

  // Function to delete an article
  const deleteArticle = (id, imageName) => {
    axios
      .delete(`http://localhost:5000/articles/${id}`, {
        data: { imageName }, // Pass the image name in the request body
      })
      .then(() => {
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.id !== id)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the article", error);
      });
  };

  // Automatically delete each article after 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      articles.forEach((article) => {
        deleteArticle(article.id);
      });
    }, 15 * 24 * 60 * 60 * 1000); // Set interval to 5 seconds

    return () => clearInterval(timer); // Cleanup the timer
  }, [articles]);

  return (
    <div className="articles-page">
      {articles.map((article) => (
        <div key={article.id} className="articles-item">
          <a href={`/articles/${article.id}`} >
            <div className="articles-card">
              <img
                src={`http://localhost:5000/uploads/${article.image}`}
                alt={article.name}
                className="articles-image home-img"
              />
              <div className="overlay">
                <p className="articles-name">{article.title}</p>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};
export default ArticlesList;
