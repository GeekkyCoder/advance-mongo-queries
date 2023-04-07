const { getAllProducts } = require("../controllers/products")

const productsRouter = require("express").Router()

productsRouter.get("/", getAllProducts)

module.exports = productsRouter