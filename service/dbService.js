const DBService = (() => {
  let instance = null;
  return class DBService {
    constructor() {
      this.conn = require('mysql2').createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'mdblog'
      });
      this.conn.connect();
    }
    static getInstance() {
      if (instance === null) {
        instance = new DBService();
      }
      return instance;
    }
    execQuery(query) {
      return new Promise((resolve, reject) => {
        this.conn.query(query, (err, result) => {
          if (err) { reject(err); }
          else { resolve(result); }
        });
      });
    }
  }
})();
module.exports = DBService;