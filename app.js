const koa = require('koa');
const pug = require('js-koa-pug');
const index = require('./routes/index.js');
const app = new koa();
const port = 3000;

app.use(pug('views'));
app.use('/', index);

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

app.listen(prot);
console.log('server start at ' + port);