const mongoose = require('mongoose')

require('dotenv').config()

const config = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to database successfully")
    }).catch((error)=>{
        console.log(error.message)
    })
}

module.exports = config