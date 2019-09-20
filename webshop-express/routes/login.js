const express = require('express');
const CustomersBLL = require('./../bll/customers');

const customersBLL = new CustomersBLL();
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/logout', (req, res, next) => {
  res.clearCookie('custvalidator');
  res.redirect('/');
});

router.post('/', async (req, res, next) => {
  const customer = await customersBLL.loginCustomerVerification(req.body);
  if (customer.valid) {
    const token = await customersBLL.giveTokenForCustomer(customer.customerID);
    res.cookie('custvalidator', token);
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
