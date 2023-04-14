const getAllNewProducts = require("../controllers/newProducts")
const { getAllProducts, getAllProductsStatic } = require("../controllers/products")

const productsRouter = require("express").Router()

productsRouter.get("/", getAllProducts)
productsRouter.get("/static", getAllProductsStatic)
productsRouter.get("/new",getAllNewProducts )


module.exports = productsRouter