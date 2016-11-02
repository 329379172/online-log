/**
 * Created by linfeiyang on 16-11-2.
 */

const Router = require('koa-router');
const userAction = require('../action/user');

const router = new Router({
    prefix: '/api'
});

router.get('/user/:id([0-9]+)', userAction.getUser);

router.post('/user', userAction.createUser);

module.exports = router;