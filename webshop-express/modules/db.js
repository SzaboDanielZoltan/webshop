const mariadb = require('mariadb');

const pool = mariadb.createPool({
  user: 'root',
  password: 'root',
  database: 'webshop',
  connectionLimit: 5,
});

module.exports = class DB {
  constructor() {
    pool.getConnection().then(conn => this.conn = conn);
  }

  async read() {
    const sql = `
         SELECT * 
         FROM products
         `;

    const result = await this.conn.query(sql);
    return result;
  }

  create() { }

  update() { }

  delete() { }
};
