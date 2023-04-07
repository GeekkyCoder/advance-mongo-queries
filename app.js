const express = require("express");
const mongoose = require("mongoose");

require("express-async-errors");
require("dotenv").config();

const notFoundMiddleware = require("./middleware/not-found");
const customErrorHandler = require("./middleware/error-handler");
const productsRouter = require("./routes/products");

const app = express();

app.use(express.json());

// routes
app.use("/api/v1/products", productsRouter);

// middlwares
app.use(notFoundMiddleware);
app.use(customErrorHandler);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.on("open", () => {
  console.log("successfully connected to mongodb!");
});

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

startServer();
