const koaRouter = require('koa-router');
const router = koaRouter();
const controller = require('./controller');

router.get('/api/book/list/:page', controller.api.bookList);
router.get('/api/book/catelog/:bid', controller.api.bookCatelog);
router.get('/api/book/content/:bid/:cid', controller.api.bookContent);
router.get('/api/voice/list/:page', controller.api.voiceList);
router.get('/api/article/daily', controller.api.articleDaily);
router.get('/api/article/random', controller.api.articleRandom);
module.exports = router;