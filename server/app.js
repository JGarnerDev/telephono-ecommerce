// Sensitive information is held in the environment variables; dotenv is used to hold them during development
require("dotenv").config();

// Our server application is an instance of express
const app = require("express")();

// Mongoose is used as a model library and to query objects from our MongoDB database
const mongoose = require("mongoose");

// Routes, held in the 'routes' directory
const usersRoute = require("./routes/users");
const productsRoute = require("./routes/products");

// Connection template string
const dbURL = `mongodb+srv://commerceApp:${process.env.DB_PASS}@cluster0.5f7z9.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/users", usersRoute);

app.use("/products", productsRoute);

// If route is not found, send the literal string
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// If there is any other error besides the above, respond with the error in detail
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

module.exports = app;
