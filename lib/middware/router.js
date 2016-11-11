'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var common = require('../lib/common');
var path = require('path');
var userService = require('../service/user');

var notFound = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ctx.type = 'text/html';
                        _context.next = 3;
                        return common.readFileAsync(path.join(path.resolve(__dirname, '../../public/dist'), 'index.html'));

                    case 3:
                        ctx.body = _context.sent;

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function notFound(_x) {
        return _ref.apply(this, arguments);
    };
}();

var login = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
        var user;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!ctx.query.token) {
                            _context2.next = 5;
                            break;
                        }

                        _context2.next = 3;
                        return userService.getUserByToken(ctx.query.token);

                    case 3:
                        user = _context2.sent;

                        if (user.id > 0) {
                            ctx.userId = user.id;
                            ctx.user = user;
                        }

                    case 5:
                        _context2.next = 7;
                        return next();

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function login(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

module.exports = {
    notFound: notFound,
    login: login
};