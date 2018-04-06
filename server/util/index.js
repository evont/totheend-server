const superagent = require('superagent');
const cheerio = require('cheerio');

module.exports = {
    crawler: (url, cb) => {
        return new Promise((resolve, reject) => {
            let data = [];
            superagent.get(url).set({
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
            }).end(function (err, res) {
                // 抛错拦截
                if(err){
                    reject(err);
                    return;
                }
                cb(res, resolve);
            });
        }).then(result => {
            return {
                status: 0,
                model: result
            }
        });
    },
    replaceText: text => {
        return text.replace(/\n|\s/gi, '');
    }
}