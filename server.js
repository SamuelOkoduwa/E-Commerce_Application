const express = require('express')
require ('dotenv').config()

const dbconfig = require ('./db/config')
const productRoute = require('./routes/productRoutes')
const adminRoute = require('./routes/adminRoutes')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method)

    next()
})

app.use('/e-commerce/api', productRoute)
app.use('/e-commerce/admin/api', adminRoute)

dbconfig()

app.listen(PORT, ()=>{
    console.log(`app listening to port ${ PORT }`)
})