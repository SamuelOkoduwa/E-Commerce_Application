const {
    registerAdmin,
    adminLogin,
    verifyProduct,
    declineProduct,
    deleteProduct,
    viewAllProducts
} = require('../controllers/adminController')

const {
    adminAuth,
    adminAuthorization
} = require('../middlewares/adminMiddleware')


const express = require('express')

const Router = express.Router()


Router.post('/register', adminAuth, registerAdmin)
Router.post('/login', adminLogin)
Router.get('/products', adminAuthorization, viewAllProducts)
Router.patch('/verify-product/:id', adminAuthorization, verifyProduct)
Router.patch('/decline-product/:id', adminAuthorization, declineProduct)
Router.delete('/delete-product/:id', adminAuthorization, deleteProduct)



module.exports = Router

