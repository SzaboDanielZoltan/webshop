const sha1 = require('js-sha1');
const DB = require('../modules/db');

const db = new DB();

module.exports = class customersBusinessLogicLayer {
  async getCustomers() {
    const customers = await db.read('customers');
    return customers;
  }

  async getOneCustomer(customerID) {
    const customer = await db.read('customers', customerID);
    return customer;
  }

  async createCustomer(customer) {
    customer.password = sha1(customer.password);
    const create = await db.create('customers', customer);
    return create;
  }

  async updateCustomer(customer) {
    const update = await db.update('customers', customer);
    return update;
  }

  async deleteCustomer(customerID) {
    const result = await db.delete('customers', customerID);
    return result;
  }

  async loginCustomerVerification(emailAndPasswordObject) {
    const customers = await this.getCustomers();
    const validCustomer = {
      valid: false,
      customerID: 'Not registered'
    };
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].email === emailAndPasswordObject.email &&
        customers[i].password === sha1(emailAndPasswordObject.password)) {
        validCustomer.valid = true;
        validCustomer.customerID = customers[i].id;
        break;
      }
    }
    return validCustomer;
  }

  async giveTokenForCustomer(customerID) {
    let token = '';
    for (let i = 0; i < 50; i++) {
      const index = Math.round(Math.random() * 25 + 65);
      const random = Math.round(Math.random() * 100);
      if (random % 2 === 0) {
        token += String.fromCharCode(index);
      } else {
        token += String.fromCharCode(index).toLowerCase();
      }
    }
    const customer = await this.getOneCustomer(customerID);
    customer.token = token;
    await this.updateCustomer(customer);
    return token;
  }

  async tokenValidator(token) {
    const customers = await this.getCustomers();
    const validToken = {
      valid: false,
      customer: 'Not logged in'
    };
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].token === token) {
        validToken.valid = true;
        validToken.customer = customers[i];
        break;
      }
    }
    return validToken;
  }

  async validateEmail(email) {
    const getAllCustomers = await this.getCustomers();
    let validationEmail = true;
    for (let i = 0; i < getAllCustomers.length; i += 1) {
      if (getAllCustomers[i].email == email) {
        validationEmail = false;
        break;
      }
    }
    return validationEmail;
  }

  // ORDERS
  async addNewCustomerOrder(custID, customerAddress, order) {
    let total = 0;
    order.forEach(prod => total += prod.price * prod.amount);
    await db.create('orders', {
      customerID: custID,
      shippingAddress: customerAddress,
      products: JSON.stringify(order),
      totalPrice: total,
      status: 1,
    });
  }

  async getOneCustomerOrders(customerID) {
    const userOrders = await db.innerJoinRead('customers', 'orders', 'id', 'customerID', customerID);
    return userOrders;
  }

  async getOneCustomerOrder(orderID) {
    const order = await db.read('orders', orderID);
    return order;
  }

  async deleteCustomerOrder(orderID) {
    const result = await db.delete('orders', orderID);
    return result;
  }

  async updateCustomerOrder(order) {
    const result = await db.update('orders', order);
    return result;
  }
};