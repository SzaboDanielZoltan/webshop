const CustomersBLL = require('./../bll/customers');

const customersBLL = new CustomersBLL();

module.exports = async (req, res, next) => {
  const validate = await customersBLL.tokenValidator(req.cookies.custvalidator);
  if (validate.valid) {
    res.locals.loggedcustomer = validate.customer;
  }
  next();
};
