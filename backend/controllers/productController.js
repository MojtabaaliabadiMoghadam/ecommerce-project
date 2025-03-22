const connection = require("../config/db");

// 📌 دریافت همه محصولات
const getAllProducts = (req, res) => {
  connection.query("SELECT * FROM products", (err, results) => {
    if (err)
      return res.status(500).json({ status: "error", message: err.message });
    res.json({
      status: "success",
      message: "Products retrieved successfully",
      data: results,
    });
  });
};

// 📌 دریافت محصول بر اساس ID
const getProductById = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, results) => {
      if (err)
        return res.status(500).json({ status: "error", message: err.message });
      if (results.length === 0)
        return res
          .status(404)
          .json({ status: "error", message: "Product not found" });
      res.json({
        status: "success",
        message: "Product retrieved successfully",
        data: results[0],
      });
    }
  );
};

// 📌 افزودن محصول جدید
const addProduct = (req, res) => {
  const { name, price, description, image } = req.body;
  if (!name || !price)
    return res
      .status(400)
      .json({ status: "error", message: "Name and price are required" });

  connection.query(
    "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)",
    [name, price, description, image],
    (err, results) => {
      if (err)
        return res.status(500).json({ status: "error", message: err.message });
      res.json({
        status: "success",
        message: "Product added successfully",
        data: { id: results.insertId, name, price, description, image },
      });
    }
  );
};

// 📌 ویرایش محصول
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;

  connection.query(
    "UPDATE products SET name=?, price=?, description=?, image=? WHERE id=?",
    [name, price, description, image, id],
    (err, results) => {
      if (err)
        return res.status(500).json({ status: "error", message: err.message });
      if (results.affectedRows === 0)
        return res
          .status(404)
          .json({ status: "error", message: "Product not found" });
      res.json({ status: "success", message: "Product updated successfully" });
    }
  );
};

// 📌 حذف محصول
const deleteProduct = (req, res) => {
  const { id } = req.params;

  connection.query("DELETE FROM products WHERE id=?", [id], (err, results) => {
    if (err)
      return res.status(500).json({ status: "error", message: err.message });
    if (results.affectedRows === 0)
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    res.json({ status: "success", message: "Product deleted successfully" });
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
