import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles/status.css";

const Status = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [status, setStatus] = useState([]); // State to hold statuses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current status

  useEffect(() => {
    // Fetch statuses for the selected category
    const fetchStatusData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/category/${id}/status`
        );
        setStatus(response.data); // Set the status data
      } catch (error) {
        console.error("Error fetching statuses:", error);
        setError("There was an error fetching the statuses.");
      } finally {
        setLoading(false); // Data loaded
      }
    };

    fetchStatusData();
  }, [id]);

  // Function to go to the next status
  const nextStatus = () => {
    if (currentIndex < status.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to go to the previous status
  const prevStatus = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Function to handle dot click
  const goToStatus = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="status-page">
      {loading ? (
        <div className="status-loading">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="status-error">
          <p>{error}</p>
        </div>
      ) : (
        <div className="status-container">
          {status.length > 0 ? (
            <div className="status-image-container">
              <img
                src={`${process.env.REACT_APP_API_URL}/uploads/${status[currentIndex].image}`}
                alt={status[currentIndex].statusTitle}
                className="status-image"
              />
              <h3 className="status-title">
                {status[currentIndex].statusTitle}
              </h3>
            </div>
          ) : (
            <div className="status-error">
              <p>No statuses available for this category.</p>
            </div>
          )}

          {/* Left and Right buttons */}
          <button
            className="status-button-left"
            onClick={prevStatus}
            disabled={currentIndex === 0}
          >
            &#10094;
          </button>
          <button
            className="status-button-right"
            onClick={nextStatus}
            disabled={currentIndex === status.length - 1}
          >
            &#10095;
          </button>

          {/* Dots Navigation */}
          <div className="status-dots">
            {status.map((_, index) => (
              <div
                key={index}
                className={`status-dot ${
                  currentIndex === index ? "active" : ""
                }`}
                onClick={() => goToStatus(index)}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
