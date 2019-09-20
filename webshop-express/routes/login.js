const express = require('express');
const CustomersBLL = require('./../bll/customers');

const customersBLL = new CustomersBLL();
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', (req, res, next) => {
  res.json(req.body);
});

module.exports = router;
