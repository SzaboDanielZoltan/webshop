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

  /**
   * Read method for database (all records or one record)
   * @param {string} table The name of the table where you would like to get the records/record
   * @param {number} id OPTIONAL ID of the record what you would like to get as an object
   */
  async read(table, id) {
    if (id) {
      const sql = `
      SELECT * 
      FROM ${table}
      WHERE id=${id}
      `;
      const result = await this.conn.query(sql);
      return result[0];
    }
    const sql = `
         SELECT * 
         FROM ${table}
         `;
    const result = await this.conn.query(sql);
    return result;
  }

  /**
   * Create method for database
   * @param {string} table The name of the table where you would like to add new records
   * @param {object} record Object with the same keys as the table columns
   */
  async create(table, record) {
    const query = `
    INSERT INTO ${table} (${Object.keys(record).join(', ')})
    VALUES (${Object.values(record).map(value => (typeof value === 'number' ? `${value}` : `'${value}'`)).join(', ')})
    `;
    const result = await this.conn.query(query);
    return result;
  }

  /**
  * Update method for database (one record)
  * @param {string} table The name of the table where you would like to update a record
  * @param {object} record Object with the same keys as the table columns
  */
  async update(table, record) {
    const query = `
    UPDATE ${table}
    SET ${Object.keys(record).map(key => (typeof record[key] === 'number' ? `${key}=${record[key]}` : `${key}='${record[key]}'`)).join(', ')}
    WHERE id=${record.id}
    `;
    const result = await this.conn.query(query);
    return result;
  }

  /**
   * Delete method for database (one record)
   * @param {string} table The name of the table where you would like to delete a record
   * @param {number} id ID of the record what you would like to remove
   */
  async delete(table, id) {
    const query = `
    DELETE FROM ${table}
    WHERE id=${id};
    `;
    const result = await this.conn.query(query);
    return result;
  }
};
