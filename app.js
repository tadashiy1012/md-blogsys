const Koa = require('koa');
const pug = require('js-koa-pug');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const port = 3000;

router.get('/', async (ctx, next) => {
  ctx.render('index');
});

app.use(pug('views'));
app.use(router.routes());

app.use(async (ctx, next) => {
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
    console.log(err);
  }
});

app.listen(port);
console.log('server start at ' + port);