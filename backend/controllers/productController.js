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
  const resultPerPage = 8;
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
exports.deleteProduct = catchAsyncError(async (req, res , next) => {
  let product = await Product.findById(req.params.id);
  if(!product){
    return next(new ErrorHander("Product not found" , 404))
  }
  await product.deleteOne();
  res.status(200).json({
    message: 'Product is deleted successfully',
    success: true
  })
})

// Create new Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res , next) => {

  const { rating , comment , productId} = req.body;
  
  const review = {
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment,
  }
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

  // review phle hua h ki nhi particular user ka 
  if(isReviewed){
    product.reviews.forEach(rev => {
      if(rev.user.toString() === req.user._id.toString())
        (rev.rating = rating),(rev.comment = comment)
    })
  }
  else{
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }

  
  // yeh overroll rating h mean avarge rating nikalna
  //  4+5+5+2  = 16/4 = 4 
  let avg = 0;

  product.reviews.forEach((rev)=> {
    avg += rev.rating                   // avg = avg + rev.rating
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave : false});

  res.status(200).json({
    success:true,
  })
})

// Get All reviews of a product
exports.getProductReviews = catchAsyncError(async ( req, res, next) => {
  const product = await Product.findById(req.query.id);

  if(!product){
    return next(new ErrorHander("Product not found" , 404))
  }
  res.status(200).json({
    success:true,
    reviews: product.reviews
  })
})


// Delete Review
exports.deleteReview = catchAsyncError(async ( req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if(!product){
    return next(new ErrorHander("Product not found" , 404))
  }

  const reviews = product.reviews.filter( rev => rev._id.toString() !== req.query.id.toString())
  
  let avg = 0;

  reviews.forEach((rev)=> {
    avg += rev.rating                   // avg = avg + rev.rating
  });

  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId , {
    reviews,
    ratings,
    numOfReviews,
  },{
    new:true,
    runValidators:true,
    useFindAndModify : false
  })

  res.status(200).json({
    success:true,
    // reviews: product.reviews
  })
})