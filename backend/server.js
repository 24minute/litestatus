const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// POST endpoint to insert data into the MySQL database
app.post("/data", (req, res) => {
  const { name } = req.body; // Assuming you're sending 'name' and 'email' from frontend

  const query = "INSERT INTO user (name) VALUES ( ?)";
  db.query(query, [name], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data");
    } else {
      res.status(200).send("Data inserted successfully");
    }
  });
});

app.get("/data", (req, res) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
