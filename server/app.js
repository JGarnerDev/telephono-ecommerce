// Our server application is an instance of express
const app = require("express")();

// Middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const validator = require("express-validator");
// ... morgan, for development
const morgan = require("morgan");

app.use(bodyParser.json());
app.use(cookieParser());

app.use(morgan("dev"));

// Routes, held in the 'routes' directory
const usersRoute = require("./routes/users");
const productsRoute = require("./routes/products");

app.use("/users", usersRoute);

app.use("/products", productsRoute);

// If route is not found, respond with the literal string
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// If there is an internal server error, respond with the error in detail
app.use((error, req, res, next) => {
  res.status(500).json({ error });
});

module.exports = app;
