const DB = require('../modules/db');

const db = new DB();

module.exports = class productsBusinessLogicLayer {
  constructor() {

  }
  async getOneOrder(orderID) {
    const order = await db.read('orders', orderID);
    return order;
  }
  async deleteOrder(orderID) {
    const result = await db.delete('orders', orderID);
    return result;
  }
  async updateOrder(order) {
    const result = await db.update('orders', order);
    return result;
  }
  async getAllOrdersWithCustomers() {
    const orders = await db.innerJoinRead('orders', 'customers', 'customerID', 'id');
    return orders;
  }
}