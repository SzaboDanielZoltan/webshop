const express = require('express');
const CustomersBLL = require('./../bll/customers');
const ProductsBLL = require('./../bll/products');

const customersBLL = new CustomersBLL();
const productsBLL = new ProductsBLL();
const router = express.Router();

router.use(async (req, res, next) => {
  if (!res.locals.loggedcustomer) {
    res.redirect('/');
  } else {
    next();
  }
});

// Basket page rendering from basket object
router.get('/', (req, res, next) => {
  const basket = JSON.parse(res.locals.loggedcustomer.basket);
  productsBLL.makeBasketWithDetails(basket).then((productsArray) => {
    // Calculating total price for rendering
    let totalPrice = 0;
    productsArray.forEach(product => (
      product.price && product.orderedAmount && product.active ?
      totalPrice += product.price * product.orderedAmount :
      totalPrice += 0));
    res.render('basket', {
      order: productsArray,
      total: totalPrice
    });
  }).catch((err) => {
    res.status(404);
    res.render('general404');
  });
});

// Adding products to customer basket
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