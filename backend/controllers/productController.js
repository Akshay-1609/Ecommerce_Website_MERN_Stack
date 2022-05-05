const req = require("express/lib/request");
const Product = require("../models/productModel");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const apiFeature = require("../utils/apifeature");

//create product -- Admin
exports.createproduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Product
module.exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apifeature = new apiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apifeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount
  });
});

// Get Single Product

exports.getProductDetial = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  } else {
    res.status(200).json({
      success: true,
      product,
    });
  }
});

// Update Product -- Admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  } else {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  }
});

// Detelet Product -- Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = Product.findById(req.params.id);
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  } else {
    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product is Deleted",
    });
  }
});
