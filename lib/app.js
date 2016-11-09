'use strict';

var Koa = require('koa');
var app = new Koa();
var morgan = require('koa-morgan');

var path = require('path');

var router = require('./router');
var routerMiddleWare = require('./middware/router');
var convert = require('koa-convert');
var serve = require('koa-static');
var koaBody = require('koa-body');
var store = require('./service/store');

app.use(morgan('combined'));

app.use(convert(serve(__dirname + '/../public/dist')));

app.use(koaBody());

app.use(routerMiddleWare.login);

app.use(router.routes());

app.use(routerMiddleWare.notFound);

app.on('error', function (err, ctx) {
    console.error('server error ');
    ctx.status = 500;
    ctx.body = { message: err.message };
});

var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
var connections = [];
io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('Connected: ' + connections.length + ' sockets connected');
    socket.on('disconnect', function (close) {
        console.log(close);
        console.log('disconnection');
        connections.splice(connections.indexOf(socket), 1);
        console.log('Connected: ' + connections.length + ' sockets connected');
    });
    socket.on('send message', function (data) {
        console.log(data);
        io.sockets.emit('new message', { msg: data });
    });
});

global.store = [];

var p = new Proxy(global.store, {
    push: function push(target, name) {
        return name in target ? target[name] : 37;
    }
});

global.store = p;

server.listen(3000, function () {
    console.info('app listen 3000 port!');
});