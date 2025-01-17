const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// Create Product - Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

  
  req.body.user = req.user.id;   // jo user product create kr rha h uski id jo humne modal m ek schema mai user banaya hai usme fill jayegi 

  const product = await Product.create(req.body);
  
  res.status(201).json({
    status: "success",
    product,
  });
});

// Get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {

  // const products = await Product.find();
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find() , req.query).search().filter().pagination(resultPerPage)
  const products = await apiFeature.query; 

  res
    .status(200)
    .json({ 
        msg:"All products fetched successfully",
        success: true,
        products ,
        productCount
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

