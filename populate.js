require("dotenv").config();

const mongooose = require("mongoose");
const Product = require("./models/product");
const products = require("./products.json");
const { default: mongoose } = require("mongoose");

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    // await Product.deleteMany();
    await Product.create(products);
    console.log("success")
  } catch (err) {
    console.log(err)
  }
};


start()