const Router = require('koa-router');
const route = new Router();

route.get('/', async (ctx, next) => {
  ctx.render('user/index');
});

module.exports = route;