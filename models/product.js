const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image_URL: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true })

const productModel = mongoose.model('product', productSchema)

module.exports = {
    productModel
}