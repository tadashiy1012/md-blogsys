const Router = require('koa-router');
const route = new Router();
const service = require('../service/entryService.js').getInstance();

route.get('/', async (ctx, next) => {
  const entries = await service.all();
  ctx.body = JSON.stringify(entries);
});

module.exports = route;