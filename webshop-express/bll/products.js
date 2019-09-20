const DB = require('../modules/db');

const db = new DB();

module.exports = class productsBusinessLogicLayer {
  constructor() {

  }

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

  async createPostFix(productId) {
    const getAllProducts = await db.read('products', productId);
    const productName=getAllProducts.productName;
    const prefixName= productName.toLowerCase().replace(/ | - |[/]|[.]|[,]/g,'-').replace(/---|--/g,'-');
    const result= await db.makePostFix('products',prefixName,productId);
    return result;
  }

  async getOneProductByPostfix(postfixName){
    const result = await db.findPostfix('products',postfixName);
    return result;
  }
};