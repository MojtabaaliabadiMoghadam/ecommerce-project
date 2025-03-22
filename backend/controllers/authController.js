const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../config/db");
require("dotenv").config();

const loginUser = (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ status: "error", message: err.message });

      if (results.length === 0) {
        return res.status(401).json({ status: "error", message: "Invalid credentials" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ status: "error", message: "Invalid credentials" });
      }

      // 📌 Generate JWT token
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token expires in 7 days
      });

      // 📌 Send response with token in body
      res.json({
        status: "success",
        message: "Login successful",
        token, // Token in response body
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    }
  );
};

const registerUser = async (req, res) => {
    const { name, email, password, phone, role } = req.body;
  
    try {
      // Check if user already exists
      const [existingUser] = await connection
        .promise()
        .query("SELECT * FROM users WHERE email = ?", [email]);
  
      if (existingUser.length > 0) {
        return res.status(400).json({ status: "error", message: "User already exists" });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Insert new user
      const [result] = await connection
        .promise()
        .query(
          "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
          [name, email, hashedPassword, phone, role || "user"]
        );
  
      // Generate token
      const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      // Send response with token
      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        token,
        userId: result.insertId,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };
module.exports = { loginUser ,registerUser};
