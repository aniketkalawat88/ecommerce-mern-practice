const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// Create Product - Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    product,
  });
});

// Get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {

  const apiFeature = ApiFeatures(Product.find() , req.query)
  const products = await Product.find();

  res
    .status(200)
    .json({ 
        msg:"All products fetched successfully",
        success: true,
        products 
     });
});

// get single product details
exports.getProductDetails = catchAsyncError(async (req, res , next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
      return 
      next(new ErrorHander('Product not found', 404))  
        // or
        // res.status(404).json({
        // success: false,
        // message: 'Product not found'
        // })
    } 
    res.status(200).json({
      message: 'Product is fetched successfully',
      success: true,
      product
    })
})

// Update Product - Admin
exports.updateProduct = catchAsyncError(async (req, res , next) => {
  
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
})

// Delete Product - Admin
exports.deleteProduct = catchAsyncError(async (req, res) => {
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
})

