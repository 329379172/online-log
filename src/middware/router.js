/**
 * Created by linfeiyang on 16-11-2.
 */

const common = require('../lib/common');
const path = require('path');
const userService = require('../service/user');

var notFound = async (ctx) => {
    ctx.type = 'text/html';
    ctx.body = await common.readFileAsync(path.join(path.resolve(__dirname, '../../public/dist'), 'index.html'));
};

var login = async (ctx, next) => {
    if (!!ctx.query.token) {
        let user = await userService.getUserByToken(ctx.query.token);
        console.log(user);
        if(!!user && user.id > 0) {
            ctx.userId = user.id;
            ctx.user = user;
        }
    }
    await next();
};

module.exports = {
    notFound: notFound,
    login: login
};