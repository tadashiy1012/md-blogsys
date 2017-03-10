const Router = require('koa-router');
const route = new Router();

route.get('/', async (ctx) => {
  ctx.render('index');
});

module.exports = route;