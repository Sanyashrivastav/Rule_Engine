// server.js
require('dotenv').config(); // loads variables from .env into process.env

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require('mongoose');

const app = express();

// Use PORT from env or fallback to 3000
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using MONGO_URI from .env
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("ERROR: MONGO_URI not set in environment variables. Create a .env file.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// route files
const CREATE_RULE = require("./routes/createRule");
const COMBINE_RULE = require("./routes/combineRule");
const EVALUATE_RULE = require("./routes/evaluateRule");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.use("/create_rule", CREATE_RULE);
app.use("/combine_rules", COMBINE_RULE);
app.use("/evaluate_rule", EVALUATE_RULE);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
