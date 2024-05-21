const cors = require('cors');
const express = require("express");
const errorHandler = require("./middleware/errors");
const app = express();
const routes = require("./routes/index");

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cors());


app.get("/", (req, res) => {
  res.json({ message: "This is call recorder APIs Backend" });
});

app.use("", routes);

// Error handling
app.use(errorHandler);

module.exports = app;
