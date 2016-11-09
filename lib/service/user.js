'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = require('./db');
var md5 = require('blueimp-md5');

var createUser = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(username, password) {
        var now, user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        username = username || '';

                        if (/\w{2,16}/.test(username)) {
                            _context.next = 3;
                            break;
                        }

                        throw new Error('\u7528\u6237\u540D\u957F\u5EA6\u5FC5\u987B\u4E3A2-16\u7684\u6570\u5B57\u548C\u5B57\u6BCD\u7EC4\u5408');

                    case 3:
                        password = password || '';

                        if (!(password.length < 4 || password.length > 16)) {
                            _context.next = 6;
                            break;
                        }

                        throw new Error('\u5BC6\u7801\u5FC5\u987B\u4E3A4-16\u4F4D');

                    case 6:
                        now = Date.now();
                        user = {
                            username: username,
                            password: md5(password),
                            lastTime: now,
                            token: md5(username + '-' + password + '-' + Date.now()),
                            createTime: now,
                            url: '/' + username
                        };
                        _context.next = 10;
                        return db.smartyAddAsync({
                            tableName: 't_user',
                            model: user
                        });

                    case 10:
                        return _context.abrupt('return', '/' + username);

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createUser(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var getUserByUsername = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(username) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        username = username || '';

                        if (!(username == '')) {
                            _context2.next = 3;
                            break;
                        }

                        return _context2.abrupt('return', {});

                    case 3:
                        _context2.next = 5;
                        return db.findAsync({
                            tableName: 't_user',
                            where: {
                                username: username
                            }
                        });

                    case 5:
                        return _context2.abrupt('return', _context2.sent);

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getUserByUsername(_x3) {
        return _ref2.apply(this, arguments);
    };
}();

var getUserById = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(id) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        id = parseInt(id);

                        if (!(id <= 0)) {
                            _context3.next = 3;
                            break;
                        }

                        return _context3.abrupt('return', {});

                    case 3:
                        _context3.next = 5;
                        return db.findAsync({
                            tableName: 't_user',
                            where: {
                                id: id
                            }
                        });

                    case 5:
                        return _context3.abrupt('return', _context3.sent);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function getUserById(_x4) {
        return _ref3.apply(this, arguments);
    };
}();

var getUserByToken = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(token) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return db.findAsync({
                            tableName: 't_user',
                            where: {
                                token: token
                            }
                        });

                    case 2:
                        return _context4.abrupt('return', _context4.sent);

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function getUserByToken(_x5) {
        return _ref4.apply(this, arguments);
    };
}();

module.exports = {
    createUser: createUser,
    getUserByUsername: getUserByUsername,
    getUserById: getUserById,
    getUserByToken: getUserByToken
};