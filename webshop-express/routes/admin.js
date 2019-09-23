const express = require('express');
const AdminsBLL = require('./../bll/admins');

const adminsBLL = new AdminsBLL();
const router = express.Router();

router.get('/', async (req, res, next) => {
  const validAdmin = await adminsBLL.adminTokenValidator(req.cookies.adminvalidator);
  if (validAdmin) {
    res.render('admin');
  }
  res.redirect('/');
});

router.get('/*', async (req, res, next) => {
  const validAdmin = await adminsBLL.adminTokenValidator(req.cookies.adminvalidator);
  if (validAdmin) {
    res.redirect('/admin');
  }
  res.redirect('/');
});

module.exports = router;
