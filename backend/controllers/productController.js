const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

// Create Product - Admin
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    product,
  });
};

// Get all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  res
    .status(200)
    .json({ 
        msg:"All products fetched successfully",
        success: true,
        products 
     });
};

// get single product details
exports.getProductDetails = async (req, res , next) => {
  let product = await Product.findById(req.params.id);
  if(!product){
    return
      // next(new ErrorHandler('Product not found', 404))  
      // or
      res.status(404).json({
      success: false,
      message: 'Product not found'
      })
  } 
  res.status(200).json({
    message: 'Product is fetched successfully',
    success: true,
    product
  })
}

// Update Product - Admin
exports.updateProduct = async (req, res , next) => {
  
  let product = await Product.findById(req.params.id);

  if(!product){
    return res.status(500).json({
      success: false,
      message: 'Product not found'
    })
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
    runValidators: true,
    useFindAndModify: false
  })
  res.status(200).json({
    message: 'Product is updated successfully',
    success: true,
    product
  })
}

// Delete Product - Admin
exports.deleteProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if(!product){
    return res.status(500).json({
      success: false,
      message: 'Product not found'
    })
  }
  await product.deleteOne();
  res.status(200).json({
    message: 'Product is deleted successfully',
    success: true
  })
}

