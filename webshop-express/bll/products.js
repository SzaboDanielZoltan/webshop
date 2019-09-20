const DB = require('../modules/db');

const db = new DB();

module.exports = class productsBusinessLogicLayer {
  async getProducts() {
    const result = await db.read('products');
    return result;
  }

  async getOneProduct(productId) {
    const result = await db.read('products', productId);
    return result;
  }

  async createProduct(productObject) {
    const result = await db.create('products', productObject);
    return result;
  }

  async updateProduct(productObject) {
    const result = await db.update('products', productObject);
    return result;
  }

  async deleteProduct(productId) {
    const result = await db.delete('products', productId);
    return result;
  }

};
