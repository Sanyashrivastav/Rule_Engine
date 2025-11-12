const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require('mongoose');

// const ruleRoutes = require("./routes/ruleRoutes");

const app = express();
const PORT = 3000;
mongoose
  .connect(
    "mongodb+srv://adityainpersonal:J4UILWJovkT7uJtI@cluster0.hf4vn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
const CREATE_RULE = require("./routes/createRule");
const COMBINE_RULE = require("./routes/combineRule");
const EVALUATE_RULE = require("./routes/evaluateRule");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Route for serving the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.use("/create_rule", CREATE_RULE);
app.use("/combine_rules", COMBINE_RULE);
app.use("/evaluate_rule", EVALUATE_RULE);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
