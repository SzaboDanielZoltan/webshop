const express = require('express');
const CustomersBLL = require('./../bll/customers');
const AdminsBLL = require('./../bll/admins');

const customersBLL = new CustomersBLL();
const adminsBLL = new AdminsBLL();
const router = express.Router();


/* GET LOGIN page. */
router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/logout', (req, res, next) => {
  res.clearCookie('custvalidator');
  res.clearCookie('adminvalidator');
  res.redirect('/products');
});

router.post('/', async (req, res, next) => {
  const customer = await customersBLL.loginCustomerVerification(req.body);
  if (customer.valid) {
    const token = await customersBLL.giveTokenForCustomer(customer.customerID);
    res.cookie('custvalidator', token);
    res.redirect('/products');
  } else {
    const admin = await adminsBLL.loginAdminVerification(req.body);
    if (admin.valid) {
      const token = await adminsBLL.giveTokenForAdmin(admin.adminID);
      res.cookie('adminvalidator', token);
      res.redirect('/admin');
    }
    const message = "You did not sign correctly, please try again!"
    res.render('login',{notRegistered:message});
  }
});

module.exports = router;
