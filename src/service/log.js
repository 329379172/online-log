/**
 * Created by linfeiyang on 16-11-3.
 */

var db = require('./db');

var createLog = async(data) => {
    data = data || {};
    data.level = data.level || 'info';
    data.createTime = Date.now();
    let result = await db.smartyAddAsync({
        tableName: 't_logs',
        model: data
    });
    result = result || {};
    return result.affectedRows > 0;
};

module.exports = {
    createLog: createLog
};