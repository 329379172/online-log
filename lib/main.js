'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _koaSession = require('koa-session2');

var _koaSession2 = _interopRequireDefault(_koaSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Koa = require('koa');
var app = new Koa();
var morgan = require('koa-morgan');

var path = require('path');

var router = require('./router');
var routerMiddleWare = require('./middware/router');
var convert = require('koa-convert');
var serve = require('koa-static');
var koaBody = require('koa-body');

app.use((0, _koaSession2.default)());

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

global.xiaoqiuStore = [];

global.xiaoqiuLogs = new Proxy(global.xiaoqiuStore, {
    set: function set(target, property, value, receiver) {
        if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) == 'object') {
            console.log('target=' + target + ',property=' + property + ',value=' + value + ',receiver=' + receiver);
            sendLog(value);
        }
        return true;
    }
});

var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
var connections = [];
var users = {};

io.use(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(socket, next) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        socket.username = 'linfeiyang';
                        _context.next = 3;
                        return next();

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('Connected: ' + connections.length + ' sockets connected');
    socket.on('disconnect', function (close) {
        console.log(close);
        console.log('disconnection');
        connections.splice(connections.indexOf(socket), 1);
        console.log('Connected: ' + connections.length + ' sockets connected');
        if (socket.username) {
            users[socket.username] = users[socket.username] || [];
            users[socket.username].splice(users[socket.username].indexOf(socket), 1);
        }
    });
    socket.on('set username', function (data) {
        console.log('set username=' + data);
        socket.username = data;
        users[socket.username] = users[socket.username] || [];
        users[socket.username].push(socket);
    });
});

var sendLog = function sendLog(value) {
    var username = value.username;
    if (!users[username] || users[username].length <= 0) {
        return;
    }
    users[username].forEach(function (userSocket) {
        console.log('send log to ' + username);
        userSocket.emit('new log', value);
    });
};

server.listen(3000, function () {
    console.info('app listen 3000 port!');
});