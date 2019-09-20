const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('products');
});

router.get('/*', (req, res, next) => {
    res.render('productName404');
});

module.exports = router;
