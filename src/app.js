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
var store = require('./service/store');

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
var io = require('socket.io')(server);
let connections = [];
io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log(`Connected: ${connections.length} sockets connected`);
    socket.on('disconnect', (close) => {
        console.log(close);
        console.log(`disconnection`);
        connections.splice(connections.indexOf(socket), 1);
        console.log(`Connected: ${connections.length} sockets connected`);
    });
    socket.on('send message', (data) => {
        console.log(data);
        io.sockets.emit('new message', {msg: data});
    });



});

global.store = [];

var p = new Proxy(global.store, {
    push: function(target, name){
        return name in target?
            target[name] :
            37;
    }
});

global.store = p;


server.listen(3000, () => {
    console.info('app listen 3000 port!');
});
