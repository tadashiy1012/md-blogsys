const UserService = (() => {
  let instance = null;
  return class UserService {
    constructor() {
      this.dbService = require('./dbService').getInstance();
    }
    static getInstance() {
      if (instance === null) {
        instance = new UserService();
      }
      return instance;
    }
    findId(name) {
      const q = 'select id from user where name = "' + name + '";';
      return this.dbService.execQuery(q);
    }
    findName(id) {
      const q = 'select name from user where id = ' + id + ';';
      return this.dbService.execQuery(q);
    }
  }
})();
module.exports = UserService;