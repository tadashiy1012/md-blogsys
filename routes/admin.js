const Router = require('koa-router');
const loginService = require('../service/loginService.js').getInstance();
const userService = require('../service/userService.js').getInstance();
const entryService = require('../service/entryService.js').getInstance();
const route = new Router();

route.get('/', async (ctx, next) => {
  const name = ctx.session.name;
  if (name) {
    if (loginService.getLogged(name)) {
      ctx.render('admin/index');
    } else {
      ctx.redirect('/login');
    }
  } else {
    ctx.redirect('/login');
  }
});

route.post('/entry', async (ctx, next) => {
  const name = ctx.session.name;
  if (name) {
    if (loginService.getLogged(name)) {
      const fidResult = await userService.findId(name);
      const id = fidResult[0].id;
      const title = ctx.request.body.title || 'no title';
      const body = ctx.request.body.body || 'no body';
      const result = await entryService.post(title, body, id);
      ctx.body = JSON.stringify({status: 200, result: result});
    } else {
      ctx.status = 401;
      ctx.body = JSON.stringify({status: 401, message: 'login required'});
    }
  } else {
    ctx.status = 401;
    ctx.body = JSON.stringify({status: 401, message: 'login required'});
  }
});

module.exports = route;