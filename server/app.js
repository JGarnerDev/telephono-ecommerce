require("dotenv").config();
const app = require("express")();
const mongoose = require("mongoose");

const dbURL = `mongodb+srv://commerceApp:${process.env.DB_PASS}@cluster0.5f7z9.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", (req, res, next) => {
  try {
    res.send("Hello from server!");
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

module.exports = app;
