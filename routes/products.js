const { getAllProducts, getAllProductsStatic } = require("../controllers/products")

const productsRouter = require("express").Router()

productsRouter.get("/", getAllProducts)
productsRouter.get("/static", getAllProductsStatic)


module.exports = productsRouter