const express = require('express');
const CustomersBLL = require('./../bll/customers');
const ProductsBLL = require('./../bll/products');

const customersBLL = new CustomersBLL();
const productsBLL = new ProductsBLL();
const router = express.Router();


// basket page, making the basket ui
router.get('/', async (req, res, next) => {
  const basket = JSON.parse(res.locals.loggedcustomer.basket);
  Promise.all(Object.keys(basket).map(async (productID) => {
    const product = await productsBLL.getOneProduct(parseInt(productID, 10));
    if (product) {
      product.orderedAmount = basket[productID];
      return product;
    }
    return { id: productID, productName: 'this' };
  })).then((productsArray) => {
    const filterProductsArray = productsArray.filter(el => el != null);
    let totalPrice = 0;
    filterProductsArray.forEach(product => (product.price && product.orderedAmount && product.active ? totalPrice += product.price * product.orderedAmount : product));
    console.log(res.locals.loggedcustomer.basket);
    res.render('basket', { order: filterProductsArray, total: totalPrice });
  });
});

// adding products to customer basket
router.post('/add/:productID', async (req, res, next) => {
  const basket = JSON.parse(res.locals.loggedcustomer.basket);
  const productID = req.params.productID;
  if (!basket[productID]) {
    basket[productID] = parseInt(req.body.orderQuantity);
  } else {
    basket[productID] += parseInt(req.body.orderQuantity);
  }
  res.locals.loggedcustomer.basket = JSON.stringify(basket);
  await customersBLL.updateCustomer(res.locals.loggedcustomer);
  res.redirect('/products');
});

// remove product from basket
router.get('/remove/:productID', async (req, res, next) => {
  const basket = JSON.parse(res.locals.loggedcustomer.basket);
  const productID = req.params.productID;
  delete basket[productID];
  res.locals.loggedcustomer.basket = JSON.stringify(basket);
  await customersBLL.updateCustomer(res.locals.loggedcustomer);
  res.redirect('/basket');
});

// empty basket
router.get('/empty', async (req, res, next) => {
  res.locals.loggedcustomer.basket = '{}';
  await customersBLL.updateCustomer(res.locals.loggedcustomer);
  res.redirect('/basket');
});

router.get('/customer/:customerID', async (req, res, next) => {
  const result = await customersBLL.getOneCustomer(parseInt(req.params.customerID, 10));
  res.json(result);
});

router.put('/customer/:customerID', async (req, res, next) => {
  const result = await customersBLL.updateCustomer(req.body);
  res.json(result);
});

module.exports = router;
