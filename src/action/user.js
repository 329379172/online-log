/**
 * Created by linfeiyang on 16-11-2.
 */

const userService = require('../service/user');

var createUser = async(ctx) => {
    ctx.type = 'text/json';
    try {
        let body = ctx.request.body || {};
        let username = body.username;
        let password = body.password;
        let result = await userService.createUser(username, password);
        ctx.body = {
            code: 200,
            data: result,
            systemTime: Date.now()
        };
        ctx.status = 200;
    } catch (e) {
        console.log(e);
        ctx.message = e.message;
        ctx.status = 400;
    }

};

var getUser = async(ctx) => {
    ctx.type = 'text/json';
    try {
        let id = ctx.params.id;
        let user = await userService.getUserById(id);
        ctx.body = {
            code: 200,
            data: user,
            systemTime: Date.now()
        };
        ctx.status = 200;
    } catch (e) {
        console.log(e);
        ctx.message = e.message;
        ctx.status = 400;
    }
};

/*var login = async() => {
    ctx.type = 'text/json';
    ctx.body = {
        code: 200,
        data: null,
        message: '暂不支持',
        systemTime: Date.now()
    };
};*/

module.exports = {
    createUser: createUser,
    getUser: getUser,
    //login: login
};
