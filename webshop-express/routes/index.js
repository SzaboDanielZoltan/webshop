const express = require('express');
const Bll = require('./../bll/products');

const db = new Bll();
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// /* pls let run once and it will fill the postfix in   */
// router.get('/', async (req, res, next) => {
//   const all = await db.getProducts();
//   for (let i = 0; i < all.length + 1; i += 1) {
//     db.createPostFix(i);
//   }
// });


module.exports = router;
