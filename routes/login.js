const Router = require('koa-router');
const service = require('../service/loginService.js').getInstance();
const route = new Router();

route.get('/', async (ctx, next) => {
  ctx.render('login/index', {hoge: 'hoge'});
});

route.post('/', async (ctx, next) => {
  const name = ctx.request.body.name;
  const pass = ctx.request.body.pass;
  console.log(name, pass);
  const login = service.execLogin(name, pass);
  if (login) {
    ctx.session.name = name;
    ctx.redirect('/admin');
  } else {
    ctx.render('login/fail');
  }
});

module.exports = route;