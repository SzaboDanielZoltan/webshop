const express = require('express');
const OrdersBll = require('./../bll/orders');

const ordersBll = new OrdersBll();
const router = express.Router();


router.get('/', async (req, res, next) => {
  const allOrderedProducts = await ordersBll.getAllOrderProducts();
  let lastThreeDifferent = [];
  for (let i = allOrderedProducts.length - 1; i >= 0; i--) {
    if (lastThreeDifferent.findIndex(prod =>
        prod.id === allOrderedProducts[i].id) === -1 || lastThreeDifferent.length === 0) {
      lastThreeDifferent.push(allOrderedProducts[i]);
    } else {
      continue;
    }
    if (lastThreeDifferent.length === 3) {
      break;
    }
  }
  lastThreeDifferent = lastThreeDifferent.map(prod => prod.url.substr(10));
  res.render('index', {
    lastThreeProd: lastThreeDifferent
  });
});

// /* pls let run once and it will fill the postfix in   */
// router.get('/', async (req, res, next) => {
//   const all = await db.getProducts();
//   for (let i = 0; i < all.length + 1; i += 1) {
//     db.createPostFix(i);
//   }
// });


module.exports = router;