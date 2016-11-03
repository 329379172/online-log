/**
 * Created by linfeiyang on 16-10-31.
 */

const Koa = require('koa');
const app = new Koa();
const morgan = require('koa-morgan');

var path = require('path');

const userRouter = require('./router/user');
const routerMiddleWare = require('./middware/router');
const convert = require('koa-convert');
const serve = require('koa-static');

app.use(morgan('combined'));

console.log(__dirname + '/../public/dist');

app.use(convert(serve(__dirname + '/../public/dist')));

app.use(userRouter.routes());

app.use(routerMiddleWare.notFound);

app.on('error', (err, ctx) => {
    console.error(`server error `);
    ctx.status = 500;
    ctx.body = { message: err.message};
});

app.listen(3000, () => {
    console.log(`listening 3000`);
});
