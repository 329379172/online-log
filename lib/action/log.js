'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logService = require('../service/log');

var createLog = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
        var data, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        if (!(typeof ctx.userId == 'undefined' || !ctx.userId || parseInt(ctx.userId) <= 0)) {
                            _context.next = 5;
                            break;
                        }

                        throw new Error('未授权的请求');

                    case 5:
                        data = ctx.request.body || {};

                        if (data.content) {
                            _context.next = 8;
                            break;
                        }

                        throw new Error('日志内容不能为空');

                    case 8:
                        data.userId = ctx.userId;
                        _context.next = 11;
                        return logService.createLog(data);

                    case 11:
                        result = _context.sent;

                        if (result) {
                            _context.next = 14;
                            break;
                        }

                        throw new Error('添加日志失败');

                    case 14:
                        global.xiaoqiuLogs.push({
                            username: ctx.user.username,
                            level: data.level || 'info',
                            content: data.content,
                            timestamp: Date.now()
                        });
                        ctx.status = 200;
                        ctx.body = {
                            code: 200,
                            message: 'ok',
                            data: result,
                            timestamp: Date.now()
                        };

                    case 17:
                        _context.next = 23;
                        break;

                    case 19:
                        _context.prev = 19;
                        _context.t0 = _context['catch'](0);

                        ctx.statu = 200;
                        ctx.body = {
                            code: 400,
                            message: _context.t0.message,
                            timestamp: Date.now()
                        };

                    case 23:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 19]]);
    }));

    return function createLog(_x) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = {
    createLog: createLog
};