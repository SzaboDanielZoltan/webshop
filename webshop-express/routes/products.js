const express = require('express');
const bll = require('./../bll/products');
const db = new bll();

const router = express.Router();

/* GET products page in order by productName ASC */
router.get('/', async (req, res, next) => {
    const result = await db.getProductsInOrder()
    res.render('products', { products: result });
});

/* GET product detail page */
router.get('/:address', async (req, res, next) => {
    const result = await db.getOneProductByPostfix(req.params.address);
    res.render('productDetail', { product: result[0] });
});


router.get('/*', (req, res, next) => {
    res.render('productName404');
});

module.exports = router;
