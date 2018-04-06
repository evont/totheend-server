const cheerio = require('cheerio');
const util = require('../util');

module.exports = {
    bookList: async ctx => {
        let page = ctx.params.page;
        let result = await util.crawler( `http://book.meiriyiwen.com/book?page=${page}`, (response, resolve) => {
            let $ = cheerio.load(response.text);
            let data = [];
            const imgPrefix = 'http://book.meiriyiwen.com';
            $('.book-list li').each(function(i, ele) {
                let _self = $(ele);
                data.push({
                    bid: /\?bid=(\d+)/gi.exec(_self.find('.book-bg').attr('href'))[1], //获取书籍id
                    cover: imgPrefix + _self.find('.book-bg img').attr('src'), //获取封面
                    name: _self.find('.book-name a').text(), //获取书名
                    author: _self.find('.book-author').text(), //获取作者
                })
            });
            resolve({
                list: data
            });
        });
        ctx.body = result;
    },
    bookCatelog: async ctx => {
        let bid = ctx.params.bid;
        let result = await util.crawler(`http://book.meiriyiwen.com/book/chapter_list/?bid=${bid}`, (response, resolve) => {
            let $ = cheerio.load(response.text);
            let data = [];
            $('.chapter-list li a').each(function(i, ele) {
                let _self = $(ele);
                data.push({
                    cid: /cid=(\d+)/gi.exec(_self.attr('href'))[1], //获取章节id
                    title: _self.text(), //获取章节标题
                })
            });
            resolve({
                catelog: data
            });
        });
        ctx.body = result;
    },
    bookContent : async ctx => {
        let bid = ctx.params.bid;
        let cid = ctx.params.cid;
        let result = await util.crawler(`http://book.meiriyiwen.com/book/chapter/?bid=${bid}&cid=${cid}`, (response, resolve) => {
            let $ = cheerio.load(response.text);
            let data = {
                title: util.replaceText($('.list-header').text()),
                content: util.replaceText($('.chapter-bg').html())
            };
            resolve(data);
        });
        ctx.body = result;
    },
    voiceList: async ctx => {
        let page = ctx.params.page || 1;
        let result = await util.crawler(`http://voice.meiriyiwen.com/voice/past?page=${page}`, (response, resolve) => {
            let $ = cheerio.load(response.text);
            const imgPrefix = 'http://voice.meiriyiwen.com';
            let data = [];
            $('.list_box').each(function(i, ele) {
                let _self = $(ele);
                let info = _self.find('.author_name').text();
                data.push({
                    vid: /\?vid=(\d+)/gi.exec(_self.find('.box_list_img').attr('href'))[1], //获取voice id
                    cover: imgPrefix + (_self.find('.box_list_img img').attr('src').replace(/_\d+/g, '')), //获取封面
                    name: util.replaceText(_self.find('.list_author a').text()), //获取声音名
                    author: info.match(/作者：(\S+(?=\s))/)[1], //获取作者
                    host: info.match(/主播：(\S+(?=\s))/)[1],
                    tag: _self.find('.voice_tag').text(), // 获取期次
                })
            });
            resolve({
                list: data
            });
        });
        ctx.body = result;
    },
    articleRandom: async ctx => {
        let bid = ctx.params.bid;
        let cid = ctx.params.cid;
        let result = await util.crawler('https://meiriyiwen.com/random', (response, resolve) => {
            let $ = cheerio.load(response.text);
            let content = '';
            $('.article_text p').each(function(i, ele) {
                let _self = $(ele);
                content += (_self.text() + '\n');
            }) 
            // 直接使用html() 方法会导致抓取回来的内容进行了unicode 转义
            let data = {
                title: util.replaceText($('#article_show h1').text()),
                author: util.replaceText($('.article_author').text()),
                content: content
            };
            
            resolve(data);
        });
        ctx.body = result;
    },
    articleDaily: async ctx => {
        let bid = ctx.params.bid;
        let cid = ctx.params.cid;
        let result = await util.crawler('https://meiriyiwen.com', (response, resolve) => {
            let $ = cheerio.load(response.text);
            let content = '';
            $('.article_text p').each(function(i, ele) {
                let _self = $(ele);
                content += (_self.text() + '\n');
            }) 
            let data = {
                title: util.replaceText($('#article_show h1').text()),
                author: util.replaceText($('.article_author').text()),
                content: content
            };
            resolve(data);
        });
        ctx.body = result;
    }
}