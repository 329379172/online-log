'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userService = require('../service/user');

var createUser = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
        var body, username, password, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ctx.type = 'text/json';
                        _context.prev = 1;
                        body = ctx.request.body || {};
                        username = body.username;
                        password = body.password;
                        _context.next = 7;
                        return userService.createUser(username, password);

                    case 7:
                        result = _context.sent;

                        ctx.body = {
                            code: 200,
                            data: result,
                            systemTime: Date.now()
                        };
                        ctx.status = 200;
                        _context.next = 17;
                        break;

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context['catch'](1);

                        console.log(_context.t0);
                        ctx.message = _context.t0.message;
                        ctx.status = 400;

                    case 17:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 12]]);
    }));

    return function createUser(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getUser = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx) {
        var id, user;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        ctx.type = 'text/json';
                        _context2.prev = 1;
                        id = ctx.params.id;
                        _context2.next = 5;
                        return userService.getUserById(id);

                    case 5:
                        user = _context2.sent;

                        ctx.body = {
                            code: 200,
                            data: user,
                            systemTime: Date.now()
                        };
                        ctx.status = 200;
                        _context2.next = 15;
                        break;

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2['catch'](1);

                        console.log(_context2.t0);
                        ctx.message = _context2.t0.message;
                        ctx.status = 400;

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[1, 10]]);
    }));

    return function getUser(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

module.exports = {
    createUser: createUser,
    getUser: getUser
};
//# sourceMappingURL=user.js.map