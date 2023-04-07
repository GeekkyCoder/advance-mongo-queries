const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  // req.query to access the query params passed to the request
  const { name, company, price } = req.query;
  const queryObj = {};

  if (name) {
    // checkout the mongoose docs for the object, regex is the pattern for name and options  for case insenstivity(lowercase)
    queryObj.name = { $regex: name, $options: "i" };
  }

  if (company) {
    queryObj.company = company;
  }

  if (price) {
    queryObj.price = price;
  }

  const products = await Product.find(queryObj);
  //   following line was just added to test the async-express-error package
  //   throw new Error("oops")
  return res.status(200).json({ products });
};

module.exports = {
  getAllProducts,
};
