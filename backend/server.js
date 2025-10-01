const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const products = require("./data/products.json");

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.get("/api/products", (req, res) => res.json(products));

app.get("/api/products/search/:keyword", (req, res) => {
  const keyword = req.params.keyword.toLowerCase();
  res.json(products.filter(p => p.name.toLowerCase().includes(keyword)));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));

