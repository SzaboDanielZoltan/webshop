const express = require('express');
const bll = require('./../bll/products');

const db = new bll();

const router = express.Router();

/* GET products page in order by productName ASC + pagination logic */
router.get('/', async (req, res, next) => {
  const result = await db.getProductsInOrder();
  let resultSize = result.length;
  const viewSize = req.cookies.viewSize;
  const filterData = [];
  let products = result

  /*setting filter data and filter length*/
  if (req.query.filter != undefined && req.query.filter != 'all') {
    result.forEach((data) => {
      if (req.query.filter == data.type) {
        filterData.push(data);
      } 
    });
    products = filterData;
    resultSize = filterData.length
  }

  /* If you have query string, then this will run, if not just normal render */
  if (req.query.filter && req.query.limit && req.query.page != undefined) {
    const getData = [];
    if (req.query.filter == 'all') {
      result.forEach((data, index) => {
        if (index < (req.query.page * req.query.limit)) {
          getData.push(data);
        }
      });
    }
    else if (req.query.filter != 'all') {
      filterData.forEach((data, index) => {
        if (index < (req.query.page * req.query.limit)) {
          getData.push(data);
        }
      });     
    }
 
    let previosPage;
    let nextOnePage;
    if (req.query.page <= 1) {
      previosPage = 1;
      nextOnePage = parseInt(req.query.page) + 1;
    } else if (req.query.page >= resultSize / req.query.limit) {
      previosPage = 1;
      nextOnePage = Math.floor(resultSize / req.query.limit);
    } else {
      previosPage = req.query.page - 1;
      nextOnePage = parseInt(req.query.page) + 1;
    }
    const currentPageData = getData.slice(getData.length - req.query.limit, getData.length);
    return res.render('products', {
      products: currentPageData,
      numberOfproducts: resultSize,
      prevPage: previosPage,
      nextPage: nextOnePage,
      displaySize: viewSize,
      filterItem: req.query.filter,
    });
  }

  res.render('products', { products: products, numberOfproducts: resultSize, displaySize: viewSize, filterItem: req.query.filter });
});

router.post('/', (req, res, next) => {
  res.cookie('viewSize', req.body.limit, { maxAge: 31536000 });
  res.redirect('/products');
});

/* GET product detail page */
router.get('/:address', async (req, res, next) => {
  const result = await db.getOneProductByPostfix(req.params.address);
  if (Object.entries(result).length === 0) {
    res.render('productName404');
  } else {
    res.render('productDetail', { product: result });
  }
});

module.exports = router;
