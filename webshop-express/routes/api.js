const express = require('express');
const router = express.Router();
const bll = require('./../bll/products');
const bllCustomer = require('./../bll/customers');
const bllOrder = require('./../bll/orders');
const sha1 = require('js-sha1');
const db = new bll();
const dbCustomer = new bllCustomer();
const dbOrder = new bllOrder();


/* Product admin methods */
router.get('/', async (req, res, next) => {
  res.json({ message: 'Server works!' });
});

router.get('/products', async (req, res, next) => {
  const result = await db.getProducts();
  res.json(result);
});
router.delete('/products/:id', async (req, res, next) => {
  const result = await db.deleteProduct(req.params.id);
  res.json(result);
});
router.post('/products', async (req, res, next) => {
  const result = await db.createProduct(req.body);
  res.json(result);
});
router.put('/products/:id', async (req, res, next) => {
  const result = await db.updateProduct(req.body); /* , req.params.id */
  res.json(result);
});

/* Customer admin methods */
router.get('/customers', async (req, res, next) => {
  const result = await dbCustomer.getCustomers();
  res.json(result);
});

router.delete('/customers/:id', async (req, res, next) => {
  const result = await dbCustomer.deleteCustomer(req.params.id);
  res.json(result);
});

router.put('/customers/:id', async (req, res, next) => {
  req.body.password = sha1(req.body.password);
  const result = await dbCustomer.updateCustomer(req.body);
  res.json(result);
});

// Order admin methods

router.get('/orders', async (req, res, next) => {
  const result = await dbOrder.getAllOrdersWithCustomers();
  res.json(result);
});
router.delete('/orders/:id', async (req, res, next) => {
  const result = await dbOrder.deleteOrder(req.params.id);
  res.json(result);
})
// router.post('/orders', async (req, res, next) => {
//   const result = await dbOrder.createOrder(req.body);
//   res.json(result);
// })
router.put('/orders/:id', async (req, res, next) => {
  const result = await dbOrder.updateOrder(req.body);
  res.json(result);
})


module.exports = router;
