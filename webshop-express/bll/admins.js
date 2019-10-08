const sha1 = require('js-sha1');
const DB = require('../modules/db');

const db = new DB();

module.exports = class adminsBusinessLogicLayer {
  async getAdmins() {
    const admins = await db.read('admins');
    return admins;
  }

  async getOneAdmin(adminID) {
    const admin = await db.read('admins', adminID);
    return admin;
  }

  async updateAdmin(admin) {
    const update = await db.update('admins', admin);
    return update;
  }

  async loginAdminVerification(emailAndPasswordObject) {
    const admins = await this.getAdmins();
    const validAdmin = { valid: false, adminID: 'Not admin!' };
    for (let i = 0; i < admins.length; i++) {
      if (admins[i].email === emailAndPasswordObject.email
        && admins[i].password === sha1(emailAndPasswordObject.password)) {
        validAdmin.valid = true;
        validAdmin.adminID = admins[i].id;
        break;
      }
    }
    return validAdmin;
  }

  async giveTokenForAdmin(adminID) {
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
    const admin = await this.getOneAdmin(adminID);
    admin.token = token;
    await this.updateAdmin(admin);
    return token;
  }

  async adminTokenValidator(token) {
    const admins = await this.getAdmins();
    let validToken = false;
    for (let i = 0; i < admins.length; i++) {
      if (admins[i].token === token) {
        validToken = true;
        break;
      }
    }
    return validToken;
  }
};
