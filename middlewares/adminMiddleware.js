require('dotenv').config()
const { 
    adminModel
} = require('../models/admin')
const jwt = require('jsonwebtoken')
const adminAuth = (req, res, next) =>{
    const { email } = req.body

    const errors = []

    if(!email){
        errors.push("Enter email address")
    }else if(!validateEmail(email)){
        errors.push("Enter a valid email address")
    }

    if(errors.length > 0){
        return res.status(500).json({ message: errors })
    }

    next()
}

const validateEmail = (email) =>{
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
    return emailRegEx.test(email) 
}


// admin authorization
const adminAuthorization = async(req, res, next) => {
    try {
        const header = req.header('Authorization')
        const splitHeader = header.split(" ")

        const token = splitHeader[1]

        if(!token || token === null){
            return res.status(500).json({ message: 'Error occurred' })
        }

        const verifyToken = jwt.verify(token, process.env.ACCESS_KEY)

        if(!verifyToken){
            return res.status(400).json({ message: 'Token not valid' })
        }

        const admin = await adminModel.findOne({ _id: verifyToken.id })

        if(!admin){
            return res.status(400).json({ message: 'User not found' })
        }

        if(verifyToken.role !== 'admin'){
            return res.status(400).json({ message: 'Unauthorized access' })
        }

        // req.user = user

        next()

    }catch(err){
        return res.status(500).json({ message: 'Permission not granted.' })
    }
}




module.exports = {
    validateEmail,
    adminAuth,
    adminAuthorization
}