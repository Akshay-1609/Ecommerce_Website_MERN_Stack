const req = require('express/lib/request');
const Product = require('../models/productModel');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrotr = require('../middleware/catchAsyncError');
const apiFeature = require('../utils/apifeature');

//create product -- Admin
exports.createproduct = catchAsyncErrotr(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

// Get all Product
module.exports.getAllProducts = catchAsyncErrotr(async (req, res) => {

    const apifeature= new  apiFeature(Product.find(),req.query).search()
    const products = await apifeature.query;
    res.status(200).json({
        success: true,
        products

    })

});

// Get Single Product 

exports.getProductDetial = catchAsyncErrotr(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler("Product Not Found", 404));
    }
    else {
        res.status(200).json({
            success: true,
            product
        })

    }

});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrotr(async (req, res, next) => {
    let product = Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler("Product Not Found", 404));
    }
    else {
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            success: true,
            product
        })

    }

});

// Detelet Product -- Admin
exports.deleteProduct = catchAsyncErrotr(
    async (req, res, next) => {
        const product = Product.findById(req.params.id);
        if (!product) {
            return next(new errorHandler("Product Not Found", 404));
        }
    
        else {
            await product.deleteOne();
    
            res.status(200).json({
                success: true,
                message: "Product is Deleted"
            })
    
        }
    }
);