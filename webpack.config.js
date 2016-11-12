/**
 * Created by linfeiyang on 16-10-27.
 */
if( process.env.NODE_ENV == 'production') {
    module.exports = require('./public/config/webpack.prod.js');
} else {
    module.exports = require('./public/config/webpack.dev.js');
}


