'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var db, t_logs, t_user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        db = require('./service/db');
                        _context.prev = 1;
                        _context.next = 4;
                        return db.executeAsync('\n            CREATE TABLE IF NOT EXISTS `t_logs` (\n            `id` int(11) NOT NULL AUTO_INCREMENT,\n            `level` enum(\'error\',\'info\',\'warn\') DEFAULT \'info\',\n            `content` varchar(255) NOT NULL,\n            `userId` varchar(45) NOT NULL,\n            `createTime` varchar(45) DEFAULT NULL,\n            PRIMARY KEY (`id`)\n            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;\n            ', null);

                    case 4:
                        t_logs = _context.sent;
                        _context.next = 7;
                        return db.executeAsync('\n            CREATE TABLE IF NOT EXISTS `t_user` (\n            `id` int(11) NOT NULL AUTO_INCREMENT,\n            `username` varchar(45) DEFAULT NULL,\n            `password` char(32) DEFAULT NULL,\n            `url` varchar(45) DEFAULT NULL,\n            `token` varchar(45) DEFAULT NULL,\n            `lastTime` bigint(13) NOT NULL,\n            `createTime` bigint(13) DEFAULT NULL,\n            PRIMARY KEY (`id`),\n            UNIQUE KEY `username_UNIQUE` (`username`)\n            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;\n        ');

                    case 7:
                        t_user = _context.sent;

                        console.log('init t_logs=' + t_logs + ', t_user=' + t_user);
                        _context.next = 15;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](1);

                        if (_context.t0.code == 'ECONNREFUSED') {
                            console.error('无法连接数据库~!');
                        } else {
                            console.error(_context.t0);
                        }
                        process.exit(0);

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 11]]);
    }));

    return function init() {
        return _ref.apply(this, arguments);
    };
}();

module.exports = init;
//# sourceMappingURL=init.js.map