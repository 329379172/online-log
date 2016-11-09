/**
 * Created by linfeiyang on 16-11-1.
 */
var node_env = process.env.NODE_ENV;

var config = require('./config/config.dev');

if(node_env === 'production') config = require('./config/config.production');

module.exports = config;



