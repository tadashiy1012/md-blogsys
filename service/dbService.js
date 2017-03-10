class DBService {

  constructor() {
    this.conn = require('mysql2').createConnection({
      host: 'localhost',
      user: 'root',
      password: 'admin',
      port: 3306,
      database: 'mdblog'
    });
    this.conn.connect();
  }

  execQuery(query) {
    return new Promise((resolve, reject) => {
      conn.query(query, (err, result) => {
        if (err) { reject(err); }
        else { resolve(result); }
      });
    });
  }

}
module.exports = DBService;