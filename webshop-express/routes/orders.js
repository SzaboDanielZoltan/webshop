const express = require('express');
const ProductsBLL = require('./../bll/products');
const CustomersBLL = require('./../bll/customers');

const productsBLL = new ProductsBLL();
const customersBLL = new CustomersBLL();
const router = express.Router();


router.get('/', async (req, res, next) => {
  const customerOrders = await customersBLL.getOneCustomerOrders(res.locals.loggedcustomer.id);
  const activeOrder = [];
  const inActiveOrder = [];
  customerOrders.forEach(order => order.products = JSON.parse(order.products));
  customerOrders.sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime());
  customerOrders.map((order) => {
    if (order.status == 1) {
      activeOrder.push(order);
    } else {
      inActiveOrder.push(order);
    }
  });

  res.render('orders', { orders: customerOrders, active: activeOrder, inactive: inActiveOrder });
});

router.get('/actual', (req, res, next) => {
  const basket = JSON.parse(res.locals.loggedcustomer.basket);
  Promise.all(Object.keys(basket).map(async (productID) => {
    const product = await productsBLL.getOneProduct(parseInt(productID, 10));
    if (product && product.active === 1) {
      const productOrderObj = {};
      productOrderObj.id = product.id;
      productOrderObj.productName = product.productName;
      productOrderObj.url = `/products/${product.urlPostfix}`;
      productOrderObj.price = product.price;
      productOrderObj.amount = basket[productID];
      return productOrderObj;
    }
  })).then((productsArray) => {
    const filterProductsArray = productsArray.filter(el => el != null);
    let totalPrice = 0;
    filterProductsArray.forEach(product => totalPrice += product.price * product.amount);
    res.render('orderpage', { order: filterProductsArray, total: totalPrice });
  });
});

router.get('/neworder', (req, res, next) => {
  if (res.locals.loggedcustomer.basket === '{}') {
    res.redirect('/basket');
  } else {
    const basket = JSON.parse(res.locals.loggedcustomer.basket);
    Promise.all(Object.keys(basket).map(async (productID) => {
      const product = await productsBLL.getOneProduct(parseInt(productID, 10));
      if (product && product.active === 1) {
        const productOrderObj = {};
        productOrderObj.id = product.id;
        productOrderObj.productName = product.productName;
        productOrderObj.url = `/products/${product.urlPostfix}`;
        productOrderObj.price = product.price;
        productOrderObj.amount = basket[productID];
        return productOrderObj;
      }
    })).then(async (productsArray) => {
      const filterProductsArray = productsArray.filter(el => el != null);
      await customersBLL.addNewCustomerOrder(res.locals.loggedcustomer.id, res.locals.loggedcustomer.address, filterProductsArray);
      res.locals.loggedcustomer.basket = '{}';
      await customersBLL.updateCustomer(res.locals.loggedcustomer);
      res.redirect('/');
    });
  }
});

module.exports = router;
