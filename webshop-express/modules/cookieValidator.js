const CustomersBLL = require('./../bll/customers');

const customersBLL = new CustomersBLL();

module.exports = async (req, res, next) => {
  const validate = await customersBLL.tokenValidator(req.cookies.custvalidator);
  if (validate.valid) {
    res.locals.loggedcustomer = validate.customer;
    if (validate.customer.basket !== '{}') {
      res.locals.basketValue = Object.values(JSON.parse(validate.customer.basket)).reduce((a, b) => a + b);
    } else {
      res.locals.basketValue = 0;
    }
  }
  next();
};
