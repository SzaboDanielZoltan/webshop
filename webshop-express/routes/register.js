const express = require('express');
const CustomersBLL = require('./../bll/customers');
const customersBLL = new CustomersBLL();

const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('register');
});

router.post('/', async (req, res, next) => {
  console.log(req.body.email);
  let checkEmail = await customersBLL.validateEmail(req.body.email)
  if (checkEmail == true) {
    let result = await customersBLL.createCustomer(req.body);
    const successMessage = "The registraition is successful. Now You can logging in!"

    return res.render('login', { success: successMessage })
  }
  const message = "This customer is already exist"
  res.render('register', { notValidmessage: message })
})

module.exports = router;
