'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = require('./db');

var createLog = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data) {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = data || {};
                        data.level = data.level || 'info';
                        data.createTime = Date.now();
                        _context.next = 5;
                        return db.smartyAddAsync({
                            tableName: 't_logs',
                            model: data
                        });

                    case 5:
                        result = _context.sent;

                        result = result || {};
                        return _context.abrupt('return', result.affectedRows > 0);

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createLog(_x) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = {
    createLog: createLog
};