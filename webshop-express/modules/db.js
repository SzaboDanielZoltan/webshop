const mariadb = require('mariadb');

const pool = mariadb.createPool({
  user: 'root',
  password: 'root',
  database: 'webshop',
});

module.exports = class DB {
  constructor() {
    pool.getConnection().then(conn => this.conn = conn);
  }


  async read(table) {
    const sql = `
         SELECT * 
         FROM ${table}
         `;
    const result = await this.conn.query(sql);
    return result;
  }

  async create(table, record) {
    const query = `
    INSERT INTO ${table} (${Object.keys(record).join(', ')})
    VALUES (${Object.values(record).join(', ')})
    `;
    const result = await this.conn.query(query);
    return result;
  }

  async update(table, record) {
    const query = `
    UPDATE ${table}
    SET ${Object.keys(record).map(key => `${key}=${record[key]}`).join(', ')}
    `;
    const result = await this.conn.query(query);
    return result;
  }

  async delete(table, id) {
    const query = `
    DELETE FROM ${table} WHERE id=${id};
    `;
    const result = await this.conn.query(query);
    return result;
  }
};
