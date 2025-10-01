const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Welcome to Bhupendra's E-Commerce App!");
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
