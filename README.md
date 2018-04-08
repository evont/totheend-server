# 观止爬虫


### 项目说明
最近对每日一文这个网站很感兴趣，发现其内容还是服务端渲染，比较好抓取，于是使用了superagent与cheerio来抓取分析它的数据，用以在我做的 [观止块应用](https://github.com/evont/toTheEnd) 中使用

### 技术栈
* koa 
  使用版本为 [koa2.0](https://koa.bootcss.com/)，用async 和await 写服务端比较简洁
* cheerio
  [cheerio](https://github.com/cheeriojs/cheerio)是为服务器特别定制的，快速、灵活、实施的jQuery. 用来从网页中以 css selector 取数据，使用方式跟 jquery 一样。
* superagent
  [superagent](http://visionmedia.github.io/superagent/)是个 http 方面的库，可以发起 get 或 post 请求。

### 使用说明
* 获取书架列表 -  /api/book/list/:pag  page 为页数
* 获取指定书籍的目录 - /api/book/catelog/:bid  bid 为书籍的id
* 获取指定书籍指定目录的内容 - /api/book/catelog/:bid  bid 为书籍的id，cid 为目录id
* 获取声音列表 - /api/voice/list/:page  page 为页数
* 获取每日一文 - /api/article/daily
* 获取随机一文 - /api/article/random