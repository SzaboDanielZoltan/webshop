const express = require('express');
const CustomersBLL = require('./../bll/customers');

const customersBLL = new CustomersBLL();
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', async (req, res, next) => {
  if (await customersBLL.loginCustomerVerification(req.body)) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
