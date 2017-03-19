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
  }
})();
module.exports = EntryService;