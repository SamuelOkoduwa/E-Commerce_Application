const express = require('express');
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteSingleProduct
} = require('../controllers/productController')

const {
    productAuth
} = require('../middlewares/productAuth')

const express = require('express')

const Router = express.Router()


Router.post('/create-product', productAuth, createProduct)

Router.get('/product/:id', getSingleProduct)

Router.get('/products', getAllProducts)

Router.patch('/edit-product/:id', updateProduct)

Router.delete('/delete-product/:id', deleteSingleProduct)


module.exports = Router;
