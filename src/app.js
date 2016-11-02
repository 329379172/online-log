/**
 * Created by linfeiyang on 16-10-31.
 */

const Koa = require('koa');
const app = new Koa();
const morgan = require('koa-morgan');

var path = require('path');

const userRouter = require('./router/user');
const routerMiddleWare = require('./middware/router');

app.use(morgan('combined'));

app.use(require('koa-static')(`${root}public/src`));

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
