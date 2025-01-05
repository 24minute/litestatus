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
const PORT = process.env.PORT;

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
app.post("/api/register", async (req, res) => {
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
app.post("/api/login", (req, res) => {
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
app.post("/api/addData", upload.single("image"), (req, res) => {
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

app.get("/api/articles", (req, res) => {
  const { category } = req.query; // Accept category as a query parameter
  const query = category
    ? "SELECT * FROM articles WHERE category = ? ORDER BY created_at DESC" // Assuming 'created_at' is the column storing the article creation date
    : "SELECT * FROM articles ORDER BY created_at DESC"; // Sorting all articles by created_at in descending order

  db.query(query, [category], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/articles/:id", (req, res) => {
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

app.delete("/api/articles/:id", (req, res) => {
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

////////////// status ////////////

// Route to fetch categories with optional search
app.get("/api/category", (req, res) => {
  const searchQuery = req.query.q || ""; // Get search term from query parameter, default to empty string

  const query = `
    SELECT c.id, c.title, c.image, MAX(s.created_at) AS status
    FROM category c
    LEFT JOIN status s ON c.id = s.category_id
    WHERE c.title LIKE ? 
    GROUP BY c.id
    ORDER BY status DESC
  `;

  db.query(query, [`%${searchQuery}%`], (err, results) => {
    if (err) {
      console.error("Error fetching categories with latest statuses:", err);
      return res.status(500).send("Error fetching categories");
    }
    res.json(results); // Send the results as JSON to the frontend
  });
});

// Route to upload a new category with an image
app.post("/api/category", upload.single("image"), (req, res) => {
  const { title } = req.body; // Assuming 'title' is part of the form data
  const image = req.file ? req.file.filename : null; // Get the uploaded image filename

  // SQL query to insert the new category
  const query = `
    INSERT INTO category (title, image)
    VALUES (?, ?)
  `;

  db.query(query, [title, image], (err, result) => {
    if (err) {
      console.error("Error inserting category:", err);
      return res.status(500).send("Error inserting category");
    }
    res.status(201).send("Category created successfully");
  });
});

// Route to get statuses by category ID
app.get("/api/category/:id/status", async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Query to fetch statuses from the database
    const query = `
      SELECT s.id AS statusId, s.title AS statusTitle, s.image
      FROM status s
      WHERE s.category_id = ?
      ORDER BY s.created_at DESC
    `;

    // Execute the query with the category ID
    const [results] = await db.promise().query(query, [categoryId]);

    // Return the results as JSON
    return res.json(results);
  } catch (err) {
    console.error("Error fetching statuses:", err);
    return res.status(500).json({ message: "Error fetching statuses" });
  }
});

// Route to upload a new status for a category
app.post("/api/status", upload.single("image"), (req, res) => {
  const { categoryId, title } = req.body; // Assuming 'categoryId' and 'title' are part of the form data
  const statusImage = req.file ? req.file.filename : null; // Get the uploaded status image filename

  // SQL query to insert the new status
  const query = `
    INSERT INTO status (category_id, title, image)
    VALUES (?, ?, ?)
  `;

  db.query(query, [categoryId, title, statusImage], (err, result) => {
    if (err) {
      console.error("Error inserting status:", err);
      return res.status(500).send("Error inserting status");
    }
    res.status(201).send("Status created successfully");
  });
});

////////////////////// Delete category ////////////////////

// Route to delete a specific status and its image
app.delete("/api/status/:id", async (req, res) => {
  const statusId = req.params.id;

  try {
    // First, fetch the status image before deleting
    const [status] = await db
      .promise()
      .query("SELECT image FROM status WHERE id = ?", [statusId]);

    if (status.length > 0 && status[0].image) {
      const statusImagePath = path.join(__dirname, "uploads", status[0].image);
      if (fs.existsSync(statusImagePath)) {
        fs.unlinkSync(statusImagePath); // Delete the status image file
      }
    }

    // Now, delete the status record
    const query = "DELETE FROM status WHERE id = ?";
    await db.promise().query(query, [statusId]);

    return res
      .status(200)
      .json({ message: "Status and its image deleted successfully" });
  } catch (err) {
    console.error("Error deleting status:", err);
    return res.status(500).json({ message: "Error deleting status" });
  }
});

// Route to delete a category and all associated statuses and their images
app.delete("/api/category/:id", async (req, res) => {
  const categoryId = req.params.id;

  try {
    // First, fetch the category image before deleting
    const [category] = await db
      .promise()
      .query("SELECT image FROM category WHERE id = ?", [categoryId]);

    // Delete the category image if it exists
    if (category.length > 0 && category[0].image) {
      const categoryImagePath = path.join(
        __dirname,
        "uploads",
        category[0].image
      );
      if (fs.existsSync(categoryImagePath)) {
        fs.unlinkSync(categoryImagePath); // Delete the category image file
      }
    }

    // Fetch all statuses associated with this category and delete their images
    const [statuses] = await db
      .promise()
      .query("SELECT image FROM status WHERE category_id = ?", [categoryId]);

    for (const status of statuses) {
      if (status.image) {
        const statusImagePath = path.join(__dirname, "uploads", status.image);
        if (fs.existsSync(statusImagePath)) {
          fs.unlinkSync(statusImagePath); // Delete the status image file
        }
      }
    }

    // Delete all statuses related to this category
    const deleteStatusesQuery = "DELETE FROM status WHERE category_id = ?";
    await db.promise().query(deleteStatusesQuery, [categoryId]);

    // Then, delete the category itself
    const deleteCategoryQuery = "DELETE FROM category WHERE id = ?";
    const [result] = await db
      .promise()
      .query(deleteCategoryQuery, [categoryId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message:
          "Category, associated statuses, and their images deleted successfully",
      });
    } else {
      return res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    console.error("Error deleting category:", err);
    return res.status(500).json({ message: "Error deleting category" });
  }
});
////////////////////// Delete status //////////////////////

// Periodic deletion of old statuses
const deleteOldStatuses = () => {
  const query = "DELETE FROM status WHERE created_at < NOW() ";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error deleting old statuses:", err);
    } else {
      console.log(`Deleted ${results.affectedRows} old statuses.`);
    }
  });
};

// Run deletion every 24 hours (86400000 milliseconds)
setInterval(deleteOldStatuses, 24 * 60 * 60 * 1000);

// Endpoint to fetch all users
app.get("/api/users", (req, res) => {
  const query = "SELECT name, email, password FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ message: "Error fetching users" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Route to fetch the total number of users
app.get("/api/users/count", async (req, res) => {
  try {
    const [result] = await db
      .promise()
      .query("SELECT COUNT(*) AS total FROM users");
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ message: "Error fetching user count" });
  }
});

///// Contact Us /////

// POST endpoint to save contact form submissions
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  // Insert data into the MySQL database
  const query = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting data: ", err);
      return res.status(500).json({ error: "An error occurred" });
    }
    res.status(201).json({ message: "Your message has been sent!" });
  });
});

// Serve the uploads folder for images (static files)
app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
