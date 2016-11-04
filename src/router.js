/**
 * Created by linfeiyang on 16-11-4.
 */
const Router = require('koa-router');
const logAction = require('./action/log');
const userAction = require('./action/user');

const router = new Router({
    prefix: '/api'
});

router.get('/user/:id([0-9]+)', userAction.getUser);

router.post('/user', userAction.createUser);

router.post('/log', logAction.createLog);

module.exports = router;