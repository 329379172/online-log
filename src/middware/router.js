/**
 * Created by linfeiyang on 16-11-2.
 */

const common = require('../lib/common');
const path = require('path');

var notFound = async (ctx) => {
    ctx.type = 'text/html';
    ctx.body = await common.readFileAsync(path.join(path.resolve(__dirname, '../../public/dist'), 'index.html'));
};

module.exports = {
    notFound: notFound
};