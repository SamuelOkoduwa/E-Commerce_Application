const {
    adminModel
} = require ('../models/admin')
const {
    productModel 
} = require('../models/product')
const bcrypt = require('bcrypt')

const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

require('dotenv').config()

const registerAdmin = async (req, res) => {
    const { username, email, password } = req.body

    try{

        if(!username){
            return res.status(400).json({ message: "Enter username." })
        }

        if(!password){
            return res.status(401).json({ message: 'Enter your password' })
        }

        const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8}$/

        if(password.length < 8 || passRegEx.test(password)){
            return res.status(400).json({ message: 'Password should be 8 character long and contain at least 1 number and a sign.' })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        if(!hashPassword){
            return res.status(400).json({ message: "An error occurred." })
        }

        const admin = new adminModel({
            username,
            password: hashPassword,
            email
        })

        await admin.save()
        
        const payloads = {
            id: admin._id,
            role: admin.role
        }

        const token = jwt.sign(payloads, process.env.ACCESS_KEY, { expiresIn: "3d" })

        return res.status(200).json({ message: "Admin created successfully", admin, token })


    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

const adminLogin = async (req, res) => {
    const { username, password } = req.body

    try{

        if(!(username || password )){
            return res.status(400).json({ message: "Enter login credentials" })
        }

        const user = await adminModel.findOne({ username })

        if(!user){
            return res.status(400).json({ message: "Invalid login credentials" })
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if(!isMatched){
            return res.status(400).json({ message: "Invalid username or password" })
        }

        const payload = {
            id: user._id,
            username: user.username,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.ACCESS_KEY, { expiresIn: "1d" })

        return res.status(200).json({ message: "Login successful", user, token })

    }catch(err){
        return res.status(400).json({ message: err.message })
    }
}

const verifyProduct = async (req, res) => {
    const { id } = req.params

    try{

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "Not a valid product id" })
        }

        const product = await productModel.findByIdAndUpdate(id, {
            status: true
        },{ new: true })

        if(!product){
            return res.status(400).json({ message: "Error verifying product" })
        }

        return res.status(200).json({ message: "Product successfully verified.", product })


    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

const declineProduct = async (req, res) => {
    const { id } = req.params

    try{

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "Not a valid product id" })
        }

        const product = await productModel.findByIdAndUpdate(id, {
            status: false
        },{ new: true })

        if(!product){
            return res.status(400).json({ message: "Error verifying product" })
        }

        return res.status(200).json({ message: "Product Declined.", product })


    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    try{

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "Not a valid product id" })
        }

        const product = await productModel.findByIdAndDelete(id)

        if(!product){
            return res.status(400).json({ message: "Error verifying product" })
        }

        return res.status(200).json({ message: "Product Deleted", product })


    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

const viewAllProducts = async (req, res) => {

    try{

        const product = await productModel.find()

        if(!product){
            return res.status(400).json({ message: "Error verifying product" })
        }

        return res.status(200).json({ message: "Successful", product })


    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}


module.exports = {
    registerAdmin,
    adminLogin,
    verifyProduct,
    declineProduct,
    deleteProduct,
    viewAllProducts
}