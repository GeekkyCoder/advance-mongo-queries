const mongooose = require("mongoose");

// enum -> Array, creates a validator that checks if the value is in the given array.

const productsSchema = new mongooose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
  },
  price: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    // if any of the values does not match, simply show the message where VALUE is the user choosen value that are in the values array!
    enum: {
      values: ["ikea", "liddy", "marcos", "caressa"],
      message: "{VALUE} is not supported",
    },
  },
});

module.exports = mongooose.model("product", productsSchema);
