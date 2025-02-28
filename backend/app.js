const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./routes/routes");
const HttpError = require("./models/http-error");

require("dotenv").config();

const app = express();
const PORT = 5000;
const MONGO_URI =
  "Provide url here";

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api", routes);

app.use((req, res, next) => {
  const error = new HttpError("Could not found this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSend) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkonwn error occurred!" });
});

mongoose
  .connect(process.env.MONGO_URI || MONGO_URI)
  .then(console.log("Connected to the database"))
  .catch((err) => {
    console.log(err.message);
  });

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is listing on ${process.env.PORT || PORT}`);
});
