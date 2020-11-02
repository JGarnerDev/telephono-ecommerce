// Sensitive information is held in the environment variables; dotenv is used to hold them during development
require("dotenv").config();
// Mongoose is used for MongoDB schemas and queries
const mongoose = require("mongoose");

const dbURL = `mongodb+srv://commerceApp:${process.env.DB_PASS}@cluster0.5f7z9.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`;
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  useCreateIndex: true,
});

const app = require("./app");

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server's up on port ${PORT}`));
