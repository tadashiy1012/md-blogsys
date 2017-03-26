const EntryService = (() => {
  let instance = null;
  return class EntryService {
    constructor() {
      this.dbService = require('./dbService').getInstance();
    }
    static getInstance() {
      if (instance === null) {
        instance = new EntryService();
      }
      return instance;
    }
    all() {
      const q = 'select * from entry;';
      return this.dbService.execQuery(q);
    }
    latest() {
      const q = 'SELECT * FROM `entry` ORDER BY `entry`.`id` DESC LIMIT 0, 10;';
      return this.dbService.execQuery(q);
    }
    find(tgtId) {
      const q = 'select * from entry where id =' + tgtId + ';';
      return this.dbService.execQuery(q);
    }
    post(title, body, authorId) {
      const dt = new Date(Date.now());
      const date = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
      const q = 'insert into entry (id, title, authorId, body, date) ' 
        + ' values (null, "' + title + '", "' + authorId +'", "' + body + '", "' + date +'");';
      return this.dbService.execQuery(q);
    }
  }
})();
module.exports = EntryService;