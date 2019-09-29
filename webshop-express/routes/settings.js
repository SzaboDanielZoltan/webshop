const express = require('express');
const CustomerBLL = require('../bll/customers');

const customerBLL = new CustomerBLL();
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('customerSettings');
});

module.exports = router;
