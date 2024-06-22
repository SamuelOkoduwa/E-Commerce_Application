const { productModel } = require('../models/product')
const mongoose = require('mongoose')
const createProduct = async(req, res)=>{

    let { name, description, stock, price, image_URL, category } = req.body
    
    // destructure user id from token created during login 
    
    // const { id } = req.user

    // format user entry

    name = `${ name.charAt(0).toUpperCase() }${ name.slice(1).toLowerCase() }`
    description = `${ description.charAt(0).toUpperCase() }${ description.slice(1).toLowerCase() }`
    category = `${ category.charAt(0).toUpperCase() }${ category.slice(1).toLowerCase() }`

    // find user by id from desctructured id in req.user

    // const user = await productModel.findById(id)

    // check if user exist 

    // if(!user){
    //    return res.status(400).json({ message: 'No user found' })
    // }


    try {

        const product = new productModel({
            name,
            description,
            stock,
            price,
            image_URL,
            category
        })

        await product.save()

        if(!product){
            res.status(400).json({message:"Error creating new product"})
        }

        res.status(200).json({ message: 'Product created successfully', product })

    }catch(err){
        return res.status(200).json({ message: err.message })
    }
    


    return res.status(200).json({ message: "Product created successfully" })
}

const getAllProducts = async(req, res)=>{
    try {
        const products = await productModel.find()

        if(!products){
            return res.status(400).json({ message: "No product found" })
        }

        return res.status(200).json({ message: 'Product queried successfully', products })

    } catch(err){
        return res.status(500).json({ message: err.message })
    }
}


const getSingleProduct = async(req, res)=>{
    const { id } = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: 'Not a valid product ID' })
        }

        const product = await productModel.findById(id)

        if(!product){
            return res.status(400).json({ message: "No product found" })
        }

        return res.status(200).json({ message: 'Product queried successfully', product })

    } catch(err){
        return res.status(500).json({ message: err.message })
    }
    
}

const updateProduct = async(req, res)=>{
    let { name, description, stock, price, image_URL, category } = req.body
    const { id } = req.params

    try {

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: 'Not a valid product ID' })
        }

        const updateProduct = await productModel.findByIdAndUpdate(id,{
            name,
            description,
            stock,
            price,
            image_URL,
            category
        }, { new: true })

        if(!updateProduct){
            return res.status(400).json({ message: 'Error updating product' })
        }

        return res.status(200).json({ message: 'Product records updated successfully', updateProduct })

    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

const deleteSingleProduct = async(req, res)=>{
    const { id } = req.params

    try {

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: 'Not a valid product ID' })
        }

        const deleteProduct = await productModel.findByIdAndDelete(id)

        if(!updateProduct){
            return res.status(400).json({ message: 'Error deleting product' })
        }

        return res.status(200).json({ message: 'Product deleted successfully', deleteProduct })

    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteSingleProduct
}