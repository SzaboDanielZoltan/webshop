const express = require('express');
const Bll = require('../bll/products');

const db = new Bll();
const router = express.Router();


/* GET LOGIN page. */
router.get('/', (req, res, next) => {
  res.render('login');
});

module.exports = router;
