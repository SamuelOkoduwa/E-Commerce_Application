const productAuth = (req, res, next) => {
    const{ name, price, description, stock, image_URL, category } = req.body
    const errors = []

    if(!name){
        errors.push("Enter product name")
    } else if(!price){
        errors.push("Enter product price")
    }else if(!description){
        errors.push("Enter product description")
    }else if(!stock){
        errors.push("Enter product stock")
    }else if(!image_URL){
        errors.push("Upload product image")
    }else if(!category){
        errors.push("Enter product category")
    }

    if(errors.length > 0){
        return res.status(400).json({ message: errors })
    }

    next()
}


module.exports = {
    productAuth
}