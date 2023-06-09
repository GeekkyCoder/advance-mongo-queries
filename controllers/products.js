const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // find all the products sort by name,price

  //   $gt -> greater than
  //   $lt -> less than
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select({ name: 1, price: 1 })
    .limit(5)
    .skip(1);
  return res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
  // req.query to access the query params passed to the request
  const { name, company, price, sort, fields, numericFilters } = req.query;
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

  if (numericFilters) {
    let operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    let regExp = /\b(>|<|>=|=|<=)\b/g;
    // returns string
    let filter = numericFilters.replace(
      regExp,
      (match) => `-${operatorMap[match]}-`
    );

    // console.log(filter)

    const options = ["price", "rating"];

    filter = filter.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = {
          [operator]: Number(value),
        };
      }
    });

    // console.log(queryObj);
  }

  let result = Product.find(queryObj);

  if (sort) {
    sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  //   following line was just added to test the async-express-error package

  //   throw new Error("oops")

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  return res.status(200).json({ products, nBHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
