/**
 * Created by linfeiyang on 16-11-1.
 */
var register = require('babel-core/register');
register({
    presets: ['stage-3']
});

require('./app.js');