const express = require('express');
const CustomersBLL = require('./../bll/customers');
const ProductsBLL = require('./../bll/products');

const customersBLL = new CustomersBLL();
const productsBLL = new ProductsBLL();
const router = express.Router();


router.get('/', async (req, res, next) => {
  const basket = JSON.parse(res.locals.loggedcustomer.basket);
  Promise.all(Object.keys(basket).map(async (productID) => {
    const product = await productsBLL.getOneProduct(parseInt(productID, 10));
    product.orderedAmount = basket[productID];
    return product;
  })).then((productsArray) => {
    let totalPrice = 0;
    productsArray.forEach(product => totalPrice += product.price * product.orderedAmount);
    res.render('basket', { order: productsArray, total: totalPrice });
  });
});

router.get('/add/:productID/:url', async (req, res, next) => {
  const basket = JSON.parse(res.locals.loggedcustomer.basket);
  const productID = req.params.productID;
  if (!basket[productID]) {
    basket[productID] = 1;
  } else {
    basket[productID] += 1;
  }
  res.locals.loggedcustomer.basket = JSON.stringify(basket);
  await customersBLL.updateCustomer(res.locals.loggedcustomer);
  res.redirect(`/products/${req.params.url}`);
});

router.get('/empty', async (req, res, next) => {
  res.locals.loggedcustomer.basket = '{}';
  await customersBLL.updateCustomer(res.locals.loggedcustomer);
  res.redirect('/basket');
});

module.exports = router;
