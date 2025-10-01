const express = require("express");
const router = express.Router();
const products = require("../data/products.json");

// GET all products
router.get("/", (req, res) => {
  res.json(products);
});

// Search products by name
router.get("/search/:keyword", (req, res) => {
  const keyword = req.params.keyword.toLowerCase();
  const result = products.filter(p => p.name.toLowerCase().includes(keyword));
  res.json(result);
});

module.exports = router;
