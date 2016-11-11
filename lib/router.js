'use strict';

var Router = require('koa-router');
var logAction = require('./action/log');
var userAction = require('./action/user');

var router = new Router({
  prefix: '/api'
});

router.get('/user/:id([0-9]+)', userAction.getUser);

router.post('/user', userAction.createUser);

router.post('/log', logAction.createLog);

module.exports = router;