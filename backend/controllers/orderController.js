const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create New Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id, // jo user login hai uski id de denge
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(     // user se populate krke name and email le lenge
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order Not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id})    /// find mean all order de do jo is id se match karega

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get All Orders --- Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find()    /// find mean all order de do

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});


// Update Order Status --- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);    /// hume id mil gyi

  if (!order) {
    return next(new ErrorHander("Order Not found with this id", 404));
  }

  if(order.orderStatus === "Delivered"){
    return next(new ErrorHander("You have already delivered this order",400))
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity)
  })

  order.orderStatus = req.body.status;
  
  if(req.body.status === "Delivered"){
    order.deliveredAt = Date.now()
  }

  await order.save({validateBeforeSave : false})

  res.status(200).json({
    success: true,
    message:"Order status Update Succesfully"
  });
});

async function updateStock(id , quantity){
  const product = await Product.findById(id);

  product.Stock -= quantity;    // product k stock m quantity km kr denge
  
  await product.save({validateBeforeSave : false})
}


// Delete Order --- Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order Not found with this id", 404));
  }

  await order.remove;

  res.status(200).json({
    success: true,
    message:"Order delete Update Succesfully"
  });
})