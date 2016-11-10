/**
 * Created by linfeiyang on 16-11-1.
 */
/**
 * Created with WebStorm.
 * User: xiaoqiu
 * Email: lupengfei@gozap.com
 * Date: 15/3/24
 * Time: 下午1:41
 * Description:
 */
var pool = require('../lib/mysql-pool');
var async = require('async');


var transactionAsync = (fnlist) => {
    return new Promise((resolve, reject) => {
        transaction(fnlist, (err) => {
            if (err) return reject(err);
            resolve();
        })
    });

};


var findAsync = async(data) => {
    let conn = await pool.getConnAsync();
    let tableName = data.tableName || '';
    if(tableName == '') {
        throw new Error('要操作的表名不能为空');
    }
    let where = data.where || {};
    let options = [];
    let sql = `select * from ${tableName} where 1=1`;
    for(var key of Object.keys(where)) {
        sql+= ` and ${key}=?`;
        options.push(where[key]);
    }
    sql+= ` limit 0,1`;
    return new Promise((resolve, reject) => {
        conn.query(sql , options, (err, result) => {
            conn.release();
            if(err) return reject(err);
            result = result || [];
            if(result.length > 0) return resolve(result[0]);
            resolve(null);
        });
    });
};

var smartyAddAsync = (data) => {
    return new Promise((resolve, reject) => {
        smartyAdd(data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


var smartySaveAsync = () => {
    return new Promise((resolve, reject) => {
        smartySave(...arguments, (err) => {
            if (err) return reject(err);
            resolve(resolve);
        });
    });
};

/**
 *
 * 事务操作
 * @param fnlist fnlist
 * @param callback
 * 事务具体操作，此方法中的所有sql
 * @param callback
 */
var transaction = function (fnlist, callback) {
    pool.getConnection(function (err, conn) {
        if (err) return callback(err);
        conn.beginTransaction(function (err) {
            if (err) {
                conn.release();
                return callback(err);
            } else {
                //开始执行事务操作
                async.eachSeries(fnlist, function (item, fn) {
                    item(conn, fn);
                }, function (err) {
                    if (err) {
                        conn.rollback(function () {
                            try {
                                conn.release();
                            } catch (e) {
                            }
                            callback(err);
                        });
                    } else {
                        conn.commit(function (err) {
                            if (err) {
                                conn.rollback(function () {
                                    try {
                                        conn.release();
                                    } catch (e) {
                                    }
                                    callback(err);
                                });
                            } else {
                                try {
                                    conn.release();
                                } catch (e) {
                                }
                                callback(err);
                            }
                        });
                    }
                });
            }
        });
    });
};
/**
 *
 * 根据sql查询多条数据
 */
var select = function (data, callback) {
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
//查询一条数据
var find = function () {
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
/**
 * 执行语句，返回执行结果
 * @param sql
 * @param options
 * @param callback
 * @return
 * { fieldCount: 0,
  affectedRows: 0,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
 */
var execute = function () {
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
/**
 * 直接根据数据模型将数据插入数据库
 * @param data data
 * @param callback 回调方法
 */
var smartyAdd = (data, callback) => {
    var tableName, model, isCheck;
    tableName = data.tableName;
    model = data.model || {};
    isCheck = data.isCheck || false;
    if (!tableName) return callback(new Error('table must not empty!'));
    async.series([
        function (fn) {
            if (isCheck) {
                //剔除不合法的字段
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
        }
    ], function (err) {
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
var smartyBatchSave = function (models, callback) {
    //todo
};
/**
 * 直接根据数据模型保存数据
 * @param conn 可空
 * @param tbname 表名
 * @param model 数据模型
 * @param where 条件
 * @param isCheck 是否检查字段名合法
 * @param callback 回调方法
 */
var smartySave = function () {
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
        async.series([
            function (fn) {
                if (isCheck) {
                    //剔除不合法的字段
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
            }
        ], function (err) {
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
        async.series([
            function (fn) {
                if (isCheck) {
                    //剔除不合法的字段
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
            }
        ], function (err) {
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
    smartySaveAsync: smartySaveAsync

};