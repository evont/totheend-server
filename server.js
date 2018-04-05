const koa = require('koa');
const router = require('./server/route');
const views = require('koa-views');
const static = require('koa-static');
const path = require('path');

const app = new koa();
// app.use(views(__dirname + '/server/views', {
//     map: {
//         html: 'underscore'
//     }
// }));
app.use(static(path.join(__dirname, 'app'), { maxage: 60 * 60 * 24 * 30}));

app.use(router.routes());
app.listen(4000);
