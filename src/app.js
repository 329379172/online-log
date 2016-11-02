/**
 * Created by linfeiyang on 16-10-31.
 */

const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next(); // next is now a function
    } catch (err) {
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
});

app.use(async (ctx, next) => {
    try {
        await next();
        ctx.status = 404;
    } catch(err) {
        next(err);
    }

});

app.listen(3000, () => {
    console.log(`listening 3000`);
});
