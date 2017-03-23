const BlogService = (() => {
  let instance = null;
  return class Service {
    constructor() {
      this.dbService = require('./dbService').getInstance();
    }
    static getInstance() {
      if (instance === null) {
        instance = new Service();
      }
      return instance;
    }
    getBlogTitle() {
      const q = 'select title from blog limit 0, 1';
      return this.dbService.execQuery(q);
    }
    getBlogAuthor() {
      const f = async () => {
        const q = 'select userId from blog limit 0, 1';
        const result = await this.dbService.execQuery(q);
        const id = result[0].userId;
        const q2 = 'select name from user where id = ' + id;
        return await this.dbService.execQuery(q2);
      };
      return f();
    }
    getBlogDescription() {
      const q = 'select description from blog limit 0, 1';
      return this.dbService.execQuery(q);
    }
  }
})();
module.exports = BlogService;