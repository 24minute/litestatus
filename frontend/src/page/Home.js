import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Home = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  // Fetch data from the backend (GET request)
  useEffect(() => {

    axios
      .get('http://178.16.139.17:5000/data') // Correctly access the environment variable
      .then((response) => {
        setData(response.data); // Store the data in the state
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle form submission (POST request)
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { name }; // Create the object with user data

    // Send the data to the backend via POST request
    axios
      .post('http://178.16.139.17:5000/data', userData)
      .then((response) => {
        console.log('Data submitted successfully');
        setData([...data, userData]); // Optionally, update the data state to reflect new submission
        setName('');
      })
      .catch((error) => console.error('Error submitting data:', error));
  };

  return (
    <div>
      <h1>Home Page</h1>

      {/* Form to submit user data */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Set the name state
        />
        <button type="submit">Submit</button>
      </form>

      {/* Display fetched data */}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
