/**
 * Created by linfeiyang on 16-11-3.
 */

var db = require('./db');
var md5 = require('blueimp-md5');

var createUser = async(username, password) => {
    username = username || '';
    if (!/\w{2,16}/.test(username)) {
        throw new Error(`用户名长度必须为2-16的数字和字母组合`)
    }
    password = password || '';
    if (password.length < 4 || password.length > 16) {
        throw new Error(`密码必须为4-16位`)
    }
    let now = Date.now();
    let user = {
        username: username,
        password: md5(password),
        lastTime: now,
        token: md5(`${username}-${password}-${Date.now()}`),
        createTime: now,
        url: `/${username}`
    };
    await db.smartyAddAsync({
        tableName: 't_user',
        model: user
    });
    return `/${username}`;
};


var getUserByUsername = async(username) => {
    username = username || '';
    if (username == '') {
        return {};
    }
    return await db.findAsync({
        tableName: 't_user',
        where: {
            username: username
        }
    });
};

var getUserById = async(id) => {
    id = parseInt(id);
    if (id <= 0) {
        return {};
    }
    return await db.findAsync({
        tableName: 't_user',
        where: {
            id: id
        }
    });
};

var getUserByToken = async(token) => {
    return await db.findAsync({
        tableName: 't_user',
        where: {
            token: token
        }
    });
};


module.exports = {
    createUser: createUser,
    getUserByUsername: getUserByUsername,
    getUserById: getUserById,
    getUserByToken: getUserByToken
};