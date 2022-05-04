const express = require('express');
const { getAllProducts,createproduct, updateProduct,deleteProduct, getProductDetial } = require('../controllers/productController');
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route('/products/new').post(createproduct);
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetial);
module.exports = router