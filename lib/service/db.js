'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _arguments = arguments;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = require('../lib/mysql-pool');
var async = require('async');

var transactionAsync = function transactionAsync(fnlist) {
    return new _promise2.default(function (resolve, reject) {
        transaction(fnlist, function (err) {
            if (err) return reject(err);
            resolve();
        });
    });
};

var findAsync = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data) {
        var conn, tableName, where, options, sql, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return pool.getConnAsync();

                    case 2:
                        conn = _context.sent;
                        tableName = data.tableName || '';

                        if (!(tableName == '')) {
                            _context.next = 6;
                            break;
                        }

                        throw new Error('要操作的表名不能为空');

                    case 6:
                        where = data.where || {};
                        options = [];
                        sql = 'select * from ' + tableName + ' where 1=1';
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 12;

                        for (_iterator = (0, _getIterator3.default)((0, _keys2.default)(where)); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            key = _step.value;

                            sql += ' and ' + key + '=?';
                            options.push(where[key]);
                        }
                        _context.next = 20;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context['catch'](12);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 20:
                        _context.prev = 20;
                        _context.prev = 21;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 23:
                        _context.prev = 23;

                        if (!_didIteratorError) {
                            _context.next = 26;
                            break;
                        }

                        throw _iteratorError;

                    case 26:
                        return _context.finish(23);

                    case 27:
                        return _context.finish(20);

                    case 28:
                        sql += ' limit 0,1';
                        return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                            conn.query(sql, options, function (err, result) {
                                conn.release();
                                if (err) return reject(err);
                                result = result || [];
                                if (result.length > 0) return resolve(result[0]);
                                resolve(null);
                            });
                        }));

                    case 30:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[12, 16, 20, 28], [21,, 23, 27]]);
    }));

    return function findAsync(_x) {
        return _ref.apply(this, arguments);
    };
}();

var smartyAddAsync = function smartyAddAsync(data) {
    return new _promise2.default(function (resolve, reject) {
        smartyAdd(data, function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

var smartySaveAsync = function smartySaveAsync() {
    return new _promise2.default(function (resolve, reject) {
        smartySave.apply(undefined, Array.prototype.slice.call(_arguments).concat([function (err) {
            if (err) return reject(err);
            resolve(resolve);
        }]));
    });
};

var transaction = function transaction(fnlist, callback) {
    pool.getConnection(function (err, conn) {
        if (err) return callback(err);
        conn.beginTransaction(function (err) {
            if (err) {
                conn.release();
                return callback(err);
            } else {
                async.eachSeries(fnlist, function (item, fn) {
                    item(conn, fn);
                }, function (err) {
                    if (err) {
                        conn.rollback(function () {
                            try {
                                conn.release();
                            } catch (e) {}
                            callback(err);
                        });
                    } else {
                        conn.commit(function (err) {
                            if (err) {
                                conn.rollback(function () {
                                    try {
                                        conn.release();
                                    } catch (e) {}
                                    callback(err);
                                });
                            } else {
                                try {
                                    conn.release();
                                } catch (e) {}
                                callback(err);
                            }
                        });
                    }
                });
            }
        });
    });
};

var select = function select(data, callback) {
    var sql, options;
    sql = data.sql;
    options = data.options;
    pool.getConnection(function (err, conn) {
        if (err) return callback(err);
        conn.query(sql, options, function (err, result) {
            conn.release();
            callback(err, result);
        });
    });
};

var find = function find() {
    var sql, options, callback;
    if (arguments.length == 3) {
        sql = arguments[0] + ' limit 0,1';
        options = arguments[1];
        callback = arguments[2];
        pool.getConnection(function (err, conn) {
            if (err) return callback(err);
            conn.query(sql, options, function (err, result) {
                conn.release();
                if (err) return callback(err);
                if (result && result.length > 0) {
                    return callback(err, result[0]);
                } else {
                    return callback(err, {});
                }
            });
        });
    } else if (arguments.length == 4) {
        var conn = arguments[0];
        sql = arguments[1] + ' limit 0,1';
        options = arguments[2];
        callback = arguments[3];
        conn.query(sql, options, function (err, result) {
            if (err) return callback(err);
            if (result && result.length > 0) {
                return callback(err, result[0]);
            } else {
                return callback(err, {});
            }
        });
    } else {
        throw new Error('arguments count is not match!');
    }
};

var execute = function execute() {
    var sql, options, callback;
    if (arguments.length == 3) {
        sql = arguments[0];
        options = arguments[1];
        callback = arguments[2];
        pool.getConnection(function (err, conn) {
            if (err) return callback(err);
            conn.query(sql, options, function (err, result) {
                conn.release();
                callback(err, result);
            });
        });
    } else if (arguments.length == 4) {
        var conn = arguments[0];
        sql = arguments[1];
        options = arguments[2];
        callback = arguments[3];
        conn.query(sql, options, function (err, result) {
            callback(err, result);
        });
    } else {
        throw new Error('arguments count is not match!');
    }
};

var executeAsync = function executeAsync(sql, options) {
    return new _promise2.default(function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(resolve, reject) {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            pool.getConnection(function (err, conn) {
                                if (err) return reject(err);
                                conn.query(sql, options, function (err, res) {
                                    if (err) return reject(err);
                                    resolve(res.affectedRows);
                                });
                            });

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x2, _x3) {
            return _ref2.apply(this, arguments);
        };
    }());
};

var smartyAdd = function smartyAdd(data, callback) {
    var tableName, model, isCheck;
    tableName = data.tableName;
    model = data.model || {};
    isCheck = data.isCheck || false;
    if (!tableName) return callback(new Error('table must not empty!'));
    async.series([function (fn) {
        if (isCheck) {
            select('show columns from ' + tableName, null, function (err, result) {
                if (err) return fn(err);
                for (var field in model) {
                    if (model.hasOwnProperty(field)) {
                        var pass = false;
                        for (var i = 0; i < result.length; i++) {
                            if (field == result[i]['Field']) {
                                pass = true;
                            }
                        }
                        if (!pass) {
                            delete model[field];
                        }
                    }
                }
                fn(null);
            });
        } else {
            fn(null);
        }
    }], function (err) {
        if (err) return callback(err);
        var fields = [];
        var values = [];
        var marks = [];
        for (var field in model) {
            if (model.hasOwnProperty(field)) {
                fields.push('`' + field + '`');
                values.push(model[field]);
                marks.push('?');
            }
        }
        if (fields.length == 0 || values.length == 0) {
            callback(new Error('data must not empty!'));
        } else {
            var sql = 'insert into ' + tableName + ' (' + fields.join(',') + ') values(' + marks.join(',') + ')';
            execute(sql, values, callback);
        }
    });
};
var smartyBatchSave = function smartyBatchSave(models, callback) {};

var smartySave = function smartySave() {
    var conn, tbname, model, where, isCheck, callback;
    if (arguments.length == 5) {
        tbname = arguments[0];
        model = arguments[1] || {};
        where = arguments[2];
        isCheck = arguments[3];
        callback = arguments[4];
        model = model || {};
        where = where || '';
        where && (where = ' where ' + where);
        if (!tbname) return callback(new Error('table must not empty!'));
        async.series([function (fn) {
            if (isCheck) {
                select('show columns from ' + tbname, null, function (err, result) {
                    if (err) return fn(err);
                    for (var field in model) {
                        if (model.hasOwnProperty(field)) {
                            var pass = false;
                            for (var i = 0; i < result.length; i++) {
                                if (field == result[i]['Field']) {
                                    pass = true;
                                }
                            }
                            if (!pass) {
                                delete model[field];
                            }
                        }
                    }
                    fn(null);
                });
            } else {
                fn(null);
            }
        }], function (err) {
            if (err) return callback(err);
            var sets = [];
            var values = [];
            for (var field in model) {
                if (model.hasOwnProperty(field)) {
                    sets.push('`' + field + '`=?');
                    values.push(model[field]);
                }
            }
            if (sets.length == 0 || values.length == 0) {
                callback(new Error('data must not empty!'));
            } else {
                var sql = 'update ' + tbname + ' set ' + sets.join(',') + where;
                execute(sql, values, callback);
            }
        });
    } else if (arguments.length == 6) {
        conn = arguments[0];
        tbname = arguments[1];
        model = arguments[2] || {};
        where = arguments[3];
        isCheck = arguments[4];
        callback = arguments[5];
        model = model || {};
        where = where || '';
        where && (where = ' where ' + where);
        if (!tbname) return callback(new Error('table must not empty!'));
        async.series([function (fn) {
            if (isCheck) {
                select(conn, 'show columns from ' + tbname, null, function (err, result) {
                    if (err) return fn(err);
                    for (var field in model) {
                        if (model.hasOwnProperty(field)) {
                            var pass = false;
                            for (var i = 0; i < result.length; i++) {
                                if (field == result[i]['Field']) {
                                    pass = true;
                                }
                            }
                            if (!pass) {
                                delete model[field];
                            }
                        }
                    }
                    fn(null);
                });
            } else {
                fn(null);
            }
        }], function (err) {
            if (err) return callback(err);
            var sets = [];
            var values = [];
            for (var field in model) {
                if (model.hasOwnProperty(field)) {
                    sets.push('`' + field + '`=?');
                    values.push(model[field]);
                }
            }
            if (sets.length == 0 || values.length == 0) {
                callback(new Error('data must not empty!'));
            } else {
                var sql = 'update ' + tbname + ' set ' + sets.join(',') + where;
                execute(conn, sql, values, callback);
            }
        });
    } else {
        throw new Error('arguments count is not match!');
    }
};
module.exports = {
    transaction: transaction,
    select: select,
    find: find,
    execute: execute,
    smartyAdd: smartyAdd,
    smartySave: smartySave,

    transactionAsync: transactionAsync,
    findAsync: findAsync,
    smartyAddAsync: smartyAddAsync,
    smartySaveAsync: smartySaveAsync,
    executeAsync: executeAsync

};
//# sourceMappingURL=db.js.map