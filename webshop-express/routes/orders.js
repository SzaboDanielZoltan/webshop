const express = require('express');
const ProductsBLL = require('./../bll/products');
const CustomersBLL = require('./../bll/customers');

const productsBLL = new ProductsBLL();
const customersBLL = new CustomersBLL();
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('orders');
});

router.get('/actual', (req, res, next) => {
  const basket = JSON.parse(res.locals.loggedcustomer.basket);
  Promise.all(Object.keys(basket).map(async (productID) => {
    const product = await productsBLL.getOneProduct(parseInt(productID, 10));
    const productOrderObj = {};
    productOrderObj.id = product.id;
    productOrderObj.productName = product.productName;
    productOrderObj.url = `/products/${product.urlPostfix}`;
    productOrderObj.price = product.price;
    productOrderObj.amount = basket[productID];
    return productOrderObj;
  })).then((productsArray) => {
    const totalPrice = 0;
    // productsArray.forEach(product => totalPrice += product.price * product.orderedAmount);
    res.render('orderpage', { order: productsArray });
  });
});

router.get('/neworder', (req, res, next) => {
  const basket = JSON.parse(res.locals.loggedcustomer.basket);
  Promise.all(Object.keys(basket).map(async (productID) => {
    const product = await productsBLL.getOneProduct(parseInt(productID, 10));
    const productOrderObj = {};
    productOrderObj.id = product.id;
    productOrderObj.productName = product.productName;
    productOrderObj.url = `/products/${product.urlPostfix}`;
    productOrderObj.price = product.price;
    productOrderObj.amount = basket[productID];
    return productOrderObj;
  })).then(async (productsArray) => {
    console.log(productsArray);
    await customersBLL.addNewCustomerOrder(res.locals.loggedcustomer.id, res.locals.loggedcustomer.address, productsArray);
    res.locals.loggedcustomer.basket = '{}';
    await customersBLL.updateCustomer(res.locals.loggedcustomer);
    res.redirect('/');
  });
});

module.exports = router;
