const connection = require("../config/db");

// Create Order
const createOrder = (req, res) => {
  const { user_id, product_id, quantity, total_price, order_date } = req.body;

  const query =
    "INSERT INTO orders (user_id, product_id, quantity, total_price, order_date) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    query,
    [user_id, product_id, quantity, total_price, order_date],
    (err, results) => {
      if (err)
        return res.status(500).json({ status: "error", message: err.message });
      res.json({
        status: "success",
        message: "Order added successfully",
        data: {
          id: results.insertId,
          user_id,
          product_id,
          quantity,
          quantity,
          total_price,
          order_date,
        },
      });
    }
  );
};

// Get All Orders
const getAllOrders = (req, res) => {
  const query = "SELECT * FROM orders";

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }
    res.json({
      status: "success",
      message: "Orders retrieved successfully",
      data: results,
    });
  });
};

// Get Order by ID
const getOrderById = (req, res) => {
  const orderId = req.params.id;
  const query = "SELECT * FROM orders WHERE id = ?";

  connection.query(query, [orderId], (err, results) => {
    if (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Order not found" });
    }
    res.json({
        status: "success",
        message: "Order retrieved successfully",
        data: results[0],
      });
  });
};

// Update Order
const updateOrder = (req, res) => {
  const orderId = req.params.id;
  const { user_id, product_id, quantity, total_price, order_date } = req.body;

  const query =
    "UPDATE orders SET user_id = ?, product_id = ?, quantity = ?, total_price = ?, order_date = ? WHERE id = ?";

  connection.query(
    query,
    [user_id, product_id, quantity, total_price, order_date, orderId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ status: "error", message: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ status: "error", message: "Order not found" });
      }
      res.json({ status: "success", message: "Product updated successfully" });
    }
  );
};

// Delete Order
const deleteOrder = (req, res) => {
  const orderId = req.params.id;
  const query = "DELETE FROM orders WHERE id = ?";

  connection.query(query, [orderId], (err, results) => {
    if (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({status: "error", message: "Order not found" });
    }
    res.json({ status: "success", message: "Product deleted successfully" });
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
