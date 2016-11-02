/**
 * Created by linfeiyang on 16-11-1.
 */
var mysql = require('mysql');
var config = require('../config');
var pool = mysql.createPool(config.db);
module.exports = pool;