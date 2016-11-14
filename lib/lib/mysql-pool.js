'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mysql = require('mysql');
var config = require('../config');
var pool = mysql.createPool(config.db);

pool.getConnAsync = function () {
    return new _promise2.default(function (resolve, reject) {
        pool.getConnection(function (err, conn) {
            if (err) return reject(err);
            resolve(conn);
        });
    });
};

module.exports = pool;
//# sourceMappingURL=mysql-pool.js.map