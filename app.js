const Koa = require('koa');
const convert = require('koa-convert');
const serve = require('koa-static');
const Router = require('koa-router');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const pug = require('js-koa-pug');
const index = require('./routes/index.js');
const admin = require('./routes/admin.js');
const user = require('./routes/user.js');
const login = require('./routes/login.js');
const entry = require('./routes/entry.js');

const app = new Koa();
app.keys = ['hogehogehoge'];
const router = new Router();
const port = 3000;

app.use(convert(session(app)));
app.use(bodyParser());
app.use(pug('views'));

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

app.use(serve(__dirname + '/public'));

router.use('/', index.routes());
router.use('/admin', admin.routes());
router.use('/user', user.routes());
router.use('/login', login.routes());
router.use('/entry', entry.routes());
app.use(router.routes());

app.listen(port);
console.log('server start at ' + port);