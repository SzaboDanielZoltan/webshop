const express = require('express');
const CustomersBLL = require('./../bll/customers');

const customersBLL = new CustomersBLL();
const router = express.Router();


/* GET LOGIN page. */
router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/logout', (req, res, next) => {
  res.clearCookie('custvalidator');
  res.redirect('/products');
});

router.post('/', async (req, res, next) => {
  const customer = await customersBLL.loginCustomerVerification(req.body);
  if (customer.valid) {
    const token = await customersBLL.giveTokenForCustomer(customer.customerID);
    res.cookie('custvalidator', token);
    res.redirect('/products');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
