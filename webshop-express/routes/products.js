const express = require('express');
const bll = require('./../bll/products');
const db = new bll();

const router = express.Router();

/* GET products page. */
router.get('/', async (req, res, next) => {
    const result = await db.getProducts();
    res.render('products', { products: result });
});

/* Product detail page */
router.get('/:address', async (req, res, next) => {
    const result = await db.getOneProductByPostfix(req.params.address);
    res.render('productDetail', { product: result[0] });
});


router.get('/*', (req, res, next) => {
    res.render('productName404');
});

module.exports = router;
