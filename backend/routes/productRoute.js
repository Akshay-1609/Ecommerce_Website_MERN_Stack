const express = require('express');
const { getAllProducts,createproduct, updateProduct,deleteProduct, getProductDetial } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");

router.route("/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAllProducts);
router.route('/products/new').post(isAuthenticatedUser,createproduct);
router.route('/product/:id').put(isAuthenticatedUser,updateProduct).delete(isAuthenticatedUser,deleteProduct).get(getProductDetial);
module.exports = router