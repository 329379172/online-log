/**
 * Created by linfeiyang on 16-11-1.
 */
var mysql = require('mysql');
var config = require('../config');
var pool = mysql.createPool(config.db);

pool.getConnAsync = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if(err) return reject(err);
            resolve(conn);
        });
    });
};

module.exports = pool;