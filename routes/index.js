const Router = require('koa-router');
const service = require('../service/blogService').getInstance();
const route = new Router();

route.get('/', async (ctx, next) => {
  const title = await service.getBlogTitle();
  const desc = await service.getBlogDescription();
  const author = await service.getBlogAuthor();
  ctx.render('index', {
    title: title[0].title,
    desc: desc[0].description,
    author: author[0].name
  });
});

module.exports = route;