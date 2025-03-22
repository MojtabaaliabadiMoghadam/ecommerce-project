const connection = require("../config/db");

const getAllUsers = (req, res) => {
  connection.query(
    "SELECT id, name, email, phone, role, created_at FROM users",
    (err, results) => {
      if (err)
        return res.status(500).json({ status: "error", message: err.message });
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: results,
      });
    }
  );
};
const getUserById = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?",
    [id],
    (err, results) => {
      if (err)
        return res.status(500).json({ status: "error", message: err.message });
      if (results.length === 0)
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      res.json({ status: "success", data: results[0] });
    }
  );
};

const createUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ status: "error", message: "Missing fields" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.query(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phone, role || "user"],
      (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ status: "error", message: err.message });
        res.status(201).json({
          status: "success",
          message: "User created",
          userId: results.insertId,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, phone, role } = req.body;

  connection.query(
    "UPDATE users SET name=?, phone=?, role=? WHERE id=?",
    [name, phone, role, id],
    (err, results) => {
      if (err)
        return res.status(500).json({ status: "error", message: err.message });
      if (results.affectedRows === 0)
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      res.json({ status: "success", message: "User updated successfully" });
    }
  );
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM users WHERE id=?", [id], (err, results) => {
    if (err)
      return res.status(500).json({ status: "error", message: err.message });
    if (results.affectedRows === 0)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    res.json({ status: "success", message: "User deleted successfully" });
  });
};
module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
