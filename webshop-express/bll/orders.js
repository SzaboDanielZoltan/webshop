const DB = require('../modules/db');

const db = new DB();

module.exports = class ordersBusinessLogicLayer {
  constructor() {

  }

  async getAllOrderProducts() {
    const orders = await db.read('orders');
    const products = [];
    orders.forEach(order =>
      JSON.parse(order.products).forEach(product => products.push(product)));
    return products;
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
    const orders = await db.innerJoinRead('customers', 'orders', 'id', 'customerID');
    return orders;
  }
}