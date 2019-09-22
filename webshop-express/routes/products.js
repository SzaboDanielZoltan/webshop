const express = require('express');
const bll = require('./../bll/products');
const db = new bll();

const router = express.Router();

/* GET products page in order by productName ASC + pagination logic */
router.get('/', async (req, res, next) => {
    const result = await db.getProductsInOrder()
    const resultSize = result.length

    /*If you have query string, then this will run, if not just normal render*/
    if (req.query.limit && req.query.page != undefined) {
        let getData = [];
        result.forEach((data, index) => {
            if (index < (req.query.page * req.query.limit)) {
                getData.push(data)
            }
        });
        if (req.query.page <= 1) {
            let previosPage = 1;
            let nextOnePage = parseInt(req.query.page) + 1;
            let currentPageData = getData.slice(getData.length - req.query.limit, getData.length)
            return res.render('products', {
                products: currentPageData, numberOfproducts: resultSize,
                prevPage: previosPage, nextPage: nextOnePage
            })
        } else if (req.query.page >= resultSize / req.query.limit) {
            let previosPage = 1;
            let nextOnePage = Math.floor(resultSize / req.query.limit)
            let currentPageData = getData.slice(getData.length - req.query.limit, getData.length)
            return res.render('products', {
                products: currentPageData, numberOfproducts: resultSize,
                prevPage: previosPage, nextPage: nextOnePage
            })
        }
        let previosPage = req.query.page - 1;
        let nextOnePage = parseInt(req.query.page) + 1;
        let currentPageData = getData.slice(getData.length - req.query.limit, getData.length)
        return res.render('products', {
            products: currentPageData, numberOfproducts: resultSize,
            prevPage: previosPage, nextPage: nextOnePage
        })
    }

    res.render('products', { products: result, numberOfproducts: resultSize });
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
