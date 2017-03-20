const Router = require('koa-router');
const route = new Router();
const service = require('../service/entryService.js').getInstance();

route.get('/', async (ctx, next) => {
  const entries = await service.latest();
  ctx.body = JSON.stringify(entries);
});

route.get('/:id', async (ctx, next) => {
  const entry = await service.find(ctx.params.id);
  ctx.body = JSON.stringify(entry);
});

module.exports = route;