/** * Created by linfeiyang on 16-10-31.  */ 
const Koa = require('koa');
const app = new Koa();
const morgan = require('koa-morgan');

var path = require('path');
import session from 'koa-session2';
var RedisStore = require('koa-redis');
const router = require('./router');
const routerMiddleWare = require('./middware/router');
const convert = require('koa-convert');
const serve = require('koa-static');
const koaBody   = require('koa-body');

app.use(session());

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

global.xiaoqiuStore = [];

global.xiaoqiuLogs = new Proxy(global.xiaoqiuStore, {
    set: (target, property, value, receiver) => {
        if(typeof value == 'object') {
            console.log(`target=${target},property=${property},value=${value},receiver=${receiver}`);
            sendLog(value);
        }
        return true;
    }
});

var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
let connections = [];
let users = {};

io.use(async (socket, next) => {
    //console.log(socket.request.headers.cookie);
    socket.username = 'linfeiyang';
    await next();
});

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log(`Connected: ${connections.length} sockets connected`);
    socket.on('disconnect', (close) => {
        console.log(close);
        console.log(`disconnection`);
        connections.splice(connections.indexOf(socket), 1);
        console.log(`Connected: ${connections.length} sockets connected`);
        if(socket.username) {
            users[socket.username] = users[socket.username] || [];
            users[socket.username].splice(users[socket.username].indexOf(socket), 1);
        }
    });
    socket.on('set username', (data) => { //设置套接字的用户名
        console.log(`set username=${data}`);
        socket.username = data;
        users[socket.username] = users[socket.username] || [];
        users[socket.username].push(socket);
    	//let username = ctx.session.username;
    	//console.log(`message: ${data}, username:${username}`);
        //io.sockets.emit('new log', {msg: data});
    });
});


var sendLog = (value) => {
    let username = value.username;
    console.log(`username=` + username);
    if(!users[username] || users[username].length <= 0) {
        return;
    }
    users[username].forEach((userSocket) => {
        console.log(`send log to ${username}`);
        userSocket.emit('new log', value);
    });
    //global.xiaoqiuStore.splice(global.xiaoqiuStore.indexOf(log), 1);
};


server.listen(3000, () => {
    console.info('app listen 3000 port!');
});
