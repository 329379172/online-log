/**
 * Created by linfeiyang on 16-10-31.
 */

const Koa = require('koa');
const app = new Koa();
const morgan = require('koa-morgan');

var path = require('path');

const router = require('./router');
const routerMiddleWare = require('./middware/router');
const convert = require('koa-convert');
const serve = require('koa-static');
const koaBody   = require('koa-body');
const logServer = require('./socket/log');


app.use(morgan('combined'));

app.use(convert(serve(__dirname + '/../public/dist')));

app.use(koaBody());

app.use(routerMiddleWare.login);

app.use(router.routes());

app.use(routerMiddleWare.notFound);

app.on('error', (err, ctx) => {
    console.error(`server error `);
    ctx.status = 500;
    ctx.body = { message: err.message};
});

var server = require('http').createServer(app.callback());
server.listen(3000, () => {
    console.log('app listen 3000 port!');
});
logServer.listen(3001, () => {
    console.log('socket listen 3001 port!');
});

