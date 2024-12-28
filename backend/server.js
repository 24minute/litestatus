const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const db = require("./config/db");

require("dotenv").config();

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
// Helper function: Create JWT token
const createToken = (user) => {
  const { id, name, role } = user;
  const secret = process.env.JWT_SECRET || "your_jwt_secret";
  return jwt.sign({ id, name, role }, secret, { expiresIn: "1h" });
};

// Route: Register User
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("SELECT COUNT(*) AS count FROM users", (err, results) => {
      if (err) return respondWithError(res, 500, "Database error");

      const isAdmin = results[0].count === 0;
      const assignedRole = isAdmin ? "admin" : role || "user";

      db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, assignedRole],
        (err) => {
          if (err) return respondWithError(res, 500, "Database error");
          res
            .status(201)
            .json({ message: "User registered", role: assignedRole });
        }
      );
    });
  } catch (error) {
    respondWithError(res, 500, "Server error");
  }
});

// Route: Login User
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return respondWithError(res, 500, "Database error");
      if (results.length === 0)
        return respondWithError(res, 404, "User not found");

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        return respondWithError(res, 401, "Invalid password");

      const token = createToken(user);

      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user.id, name: user.name, role: user.role },
      });
    }
  );
});

// API to insert data
app.post("/addData", upload.single("image"), (req, res) => {
  const { title, description, category } = req.body;
  const image = req.file ? req.file.filename : null;

  const query =
    "INSERT INTO articles (title, description, category, image, created_at) VALUES (?, ?, ?, ?, NOW())";
  db.query(query, [title, description, category, image], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Error inserting data");
    }
    res.status(200).send("Data inserted successfully");
  });
});

// Get all articles
app.get("/articles", (req, res) => {
  db.query("SELECT * FROM articles", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/articles/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM articles WHERE id = ?";
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching article:", err);
      return res.status(500).send("Error fetching article.");
    }
    if (results.length === 0) {
      return res.status(404).send("Article not found.");
    }
    res.json(results[0]); // Return the article as JSON
  });
});


app.delete("/articles/:id", (req, res) => {
  const articleId = req.params.id;

  // Query to fetch the article's image name
  const query = "SELECT image FROM articles WHERE id = ?";
  db.query(query, [articleId], (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching the article image");
    }

    const imageName = results[0]?.image;

    // Delete the image file from the server
    if (imageName) {
      const imagePath = path.join(__dirname, "uploads", imageName);
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting the image file", unlinkErr);
        }
      });
    }

    // Delete the article from the database
    const deleteQuery = "DELETE FROM articles WHERE id = ?";
    db.query(deleteQuery, [articleId], (deleteErr) => {
      if (deleteErr) {
        return res.status(500).send("Error deleting the article");
      }
      res.send("Article deleted successfully");
    });
  });
});

// Serve the uploads folder for images (static files)
app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
