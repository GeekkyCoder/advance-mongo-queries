const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const notFoundMiddleware = require("./middleware/not-found");
const customErrorHandler = require("./middleware/error-handler");

const app = express();

app.use(express.json());

// middlwares
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.on("open", () => {
    console.log("successfully connected to mongodb!")
})

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    app.listen(PORT, () => {
      console.log(`listening to server at port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer()
