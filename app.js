const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller')
const app = new Koa();

//log request URL
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});

app.use(bodyParser());

app.use(controller());

app.listen(3000);
console.log('app started at port 3000');