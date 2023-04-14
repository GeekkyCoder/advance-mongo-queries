const Product = require("../models/product");

const getAllNewProducts = async (req, res) => {
  const { name,price,company,numericFilters,sort,fields} = req.query;
  let queryObj = {}

  if(name){
    queryObj.name = { $regex: name, $options: "i" }
  }

  if(price){
    queryObj.price = price 
  }

  if(company){
    queryObj.company = company
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
  }


  let result =  Product.find(queryObj);

  if(sort){
    let sortList = sort.split(",").join(" ")
    result = result.sort(`-${sortList}`)
  }

  if(fields){
    let sortFields = fields.split(",").join(" ")
    result = result.select(`${sortFields}`)
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result 

  res.status(200).json({ products });
};

module.exports = getAllNewProducts;
