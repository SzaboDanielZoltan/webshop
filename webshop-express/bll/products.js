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

  /**
   * Method to make a basket array from an object
   * @param {Object} basket Customer basket with product ids and ordered amounts
   */
  makeBasketWithDetails(basket) {
    return Promise.all(Object.keys(basket).map(async (productID) => {
      const product = await this.getOneProduct(parseInt(productID, 10));
      if (product) {
        product.orderedAmount = basket[productID];
        return product;
      }
      return { id: productID };
    }));
  }

  async createPostFix(productId) {
    const getProduct = await db.read('products', parseInt(productId));
    const productName = getProduct.productName;
    const prefixName = productName.toLowerCase().replace(/ | - |[/]|[.]|[,]/g, '-').replace(/---|--/g, '-');
    const updatedProduct = { id: productId, urlPostfix: prefixName };
    const result = await db.update('products', updatedProduct);
    return result;
  }

  async getOneProductByPostfix(postfixName) {
    let result = {};
    const getAllProducts = await db.read('products');
    for (let i = 0; i < getAllProducts.length; i++) {
      if (getAllProducts[i].urlPostfix === postfixName) {
        result = getAllProducts[i];
        break;
      }
    }
    return result;
  }

  async getProductsInOrder() {
    const result = await this.getProducts();
    const activeProducts = [];
    result.forEach((product) => {
      if (product.active == 1) {
        activeProducts.push(product);
      }
    });
    // comparison function
    const compare = (x, y) => (x > y ? 1 : x < y ? -1 : 0);

    // sort by productName ascending then type ascending
    const sortedProduts = activeProducts.sort((a, b) => compare(
      [compare(a.productName.toLowerCase(), b.productName.toLowerCase()), compare(a.type, b.type)],
      [compare(b.productName.toLowerCase(), a.productName.toLowerCase()), compare(b.type, a.type)],
    ));

    return sortedProduts;
  }
};
