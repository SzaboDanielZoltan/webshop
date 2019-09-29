const express = require('express');
const sha1 = require('js-sha1');
const CustomerBLL = require('../bll/customers');

const customerBLL = new CustomerBLL();
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('customerSettings');
});

router.post('/:attribute', async (req, res, next) => {
  if (req.params.attribute === 'password') {
    if (sha1(req.body.actualPassword) === res.locals.loggedcustomer.password
      && req.body.newPassword1 === req.body.newPassword2) {
      res.locals.loggedcustomer.password = sha1(req.body.newPassword1);
      await customerBLL.updateCustomer(res.locals.loggedcustomer);
      res.render('customerSettings', { message: `You changed your ${req.params.attribute.toLowerCase()} successfully` });
    } else if (sha1(req.body.actualPassword) !== res.locals.loggedcustomer.password) {
      res.render('customerSettings', { alert: `Your actual ${req.params.attribute.toLowerCase()} is wrong!` });
    } else {
      res.render('customerSettings', { alert: `New ${req.params.attribute.toLowerCase()}s are not matching!` });
    }
  } else {
    res.locals.loggedcustomer[req.params.attribute] = req.body[req.params.attribute];
    await customerBLL.updateCustomer(res.locals.loggedcustomer);
    res.render('customerSettings', { message: `You changed your ${req.params.attribute.toLowerCase()} successfully` });
  }
});

router.get('/:attribute', async (req, res, next) => {
  res.render('customerSettings', { attr: req.params.attribute });
});

module.exports = router;
