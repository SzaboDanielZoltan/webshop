const CustomersBLL = require('./../bll/customers');
const AdminsBLL = require('./../bll/admins');

const customersBLL = new CustomersBLL();
const adminsBLL = new AdminsBLL();

module.exports = async (req, res, next) => {
  const validate = await customersBLL.tokenValidator(req.cookies.custvalidator);
  if (validate.valid) {
    res.locals.loggedcustomer = validate.customer;
    if (validate.customer.basket !== '{}') {
      res.locals.basketValue = Object.keys(JSON.parse(validate.customer.basket)).length;
    } else {
      res.locals.basketValue = 0;
    }
  } else {
    const validAdmin = await adminsBLL.adminTokenValidator(req.cookies.adminvalidator);
    if (validAdmin) {
      res.locals.loggedadmin = true;
    }
  }
  next();
};
