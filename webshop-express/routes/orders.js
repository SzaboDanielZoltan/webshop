const express = require('express');
const ProductsBLL = require('./../bll/products');
const CustomersBLL = require('./../bll/customers');

const productsBLL = new ProductsBLL();
const customersBLL = new CustomersBLL();
const router = express.Router();


router.get('/', async (req, res, next) => {
  const customerOrders = await customersBLL.getOneCustomerOrders(res.locals.loggedcustomer.id);
  customerOrders.forEach(order => order.products = JSON.parse(order.products));
  customerOrders.sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime());
  res.render('orders', { orders: customerOrders });
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
    let totalPrice = 0;
    productsArray.forEach(product => totalPrice += product.price * product.amount);
    res.render('orderpage', { order: productsArray, total: totalPrice });
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
    await customersBLL.addNewCustomerOrder(res.locals.loggedcustomer.id, res.locals.loggedcustomer.address, productsArray);
    res.locals.loggedcustomer.basket = '{}';
    await customersBLL.updateCustomer(res.locals.loggedcustomer);
    res.redirect('/');
  });
});

module.exports = router;
