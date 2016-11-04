/**
 * Created by linfeiyang on 16-11-4.
 */
const koa = require('koa');
var app = new koa();
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);

var users = [];

var connections = [];


io.on('connection', (socket) => {
    connections.push(socket);
    console.log(`Connected: ${connections.length} sockets connected`);
    //connections.splice(connections.indexOf(socket), 1);
});




module.exports = server;

