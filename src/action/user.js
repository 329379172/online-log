/**
 * Created by linfeiyang on 16-11-2.
 */

const db = require('../service/db');

var createUser = (ctx, next) => {
    console.log(ctx);
    next();
};



var getUser = (ctx, next) => {
    ctx.body = 'hehe';
    ctx.status = 200;
};

module.exports = {
    createUser: createUser,
    getUser: getUser
};
