/**
 * Created by linfeiyang on 16-11-4.
 */
const logService = require('../service/log');

var createLog = async(ctx) => {
    try {
        if (typeof ctx.userId == 'undefined' || !ctx.userId || parseInt(ctx.userId) <= 0) {
            throw new Error('未授权的请求');
        } else {
            let data = ctx.request.body || {};
            if(!data.content) {
                throw new Error('日志内容不能为空');
            }
            data.userId = ctx.userId;
            let result = await logService.createLog(data);
            if(!result) {
                throw new Error('添加日志失败');
            }
            global.store.push({
                username: ctx.user.username,
                msg: data
            });
            ctx.status = 200;
            ctx.body = {
                code: 200,
                message: 'ok',
                data: result,
                timestamp: Date.now()
            };
        }
    } catch (err) {
        ctx.statu = 200;
        ctx.body = {
            code: 400,
            message: err.message,
            timestamp: Date.now()
        };
    }
};

module.exports = {
    createLog: createLog
};