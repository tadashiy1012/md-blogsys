const Router = require('koa-router');
const service = require('../service/loginService.js').getInstance();
const route = new Router();

route.get('/', async (ctx, next) => {
  const name = ctx.session.name;
  if (name) {
    if (service.getLogged(name)) {
      ctx.render('admin/index');
    } else {
      ctx.redirect('/login');
    }
  } else {
    ctx.redirect('/login');
  }
});

module.exports = route;