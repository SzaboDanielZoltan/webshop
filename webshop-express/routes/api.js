const express = require('express');
const bll = require('./../bll/products');
const db = new bll();
const router = express.Router();

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
})
router.post('/products', async (req, res, next) => {
  const result = await db.createProduct(req.body);
  res.json(result);
})
router.put('/products/:id', async (req, res, next) => {
  const result = await db.updateProduct(req.body);  /* , req.params.id*/
  res.json(result);
})

module.exports = router;