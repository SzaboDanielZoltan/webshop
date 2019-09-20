const sha1 = require('js-sha1');
const DB = require('../modules/db');

const db = new DB();

module.exports = class customersBusinessLogicLayer {
  async getCustomers() {
    const customers = await db.read('customers');
    return customers;
  }

  async loginCustomerVerification(emailAndPasswordObject) {
    const customers = await this.getCustomers();
    let validCustomer = false;
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].email === emailAndPasswordObject.email
        && customers[i].password === sha1(emailAndPasswordObject.password)) {
        validCustomer = true;
        break;
      }
    }
    return validCustomer;
  }
};
