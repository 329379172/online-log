'use strict';

var winston = require('winston');
var moment = require('moment');
winston.add(winston.transports.DailyRotateFile, { filename: 'logs/', datePattern: '/yyyy-MM-dd.log', timestamp: function timestamp() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  } });
winston.remove(winston.transports.Console);
module.exports = winston;