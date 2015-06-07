# inka.js - Reactive Web Crawler

Inka is useful especially for downloading contents of blogs, news sites, and so on.

## Requirements

 * node

## How to use

Take at the `example` directory.

But for short you configure which part of site is an "article", what types of
links you want to visit, decide how an article object should look like and finally
do whatever you want with this object.


config.js:

```js
var self = module.exports = {
    url: 'http://example.com/html',
    rootUrl: 'http://example.com/', // for links starting with "/"
    debounce: 1000,
    selectors: {
        article: 'article',
        links: 'a'
    },
    callbacks: {
        toArticle: function($) {
            return {
                title: $('h2 > a').text(),
                date: $('time').attr('datetime'),
                body: $('section').html()
            };
        },
        shouldDownloadLink: function($) { // probably you want to filter only "next page" links
            return $('a').text() == '»';
        },
        extractUrlFromLink: function($) {
            return $('a').attr('href');
        }
    }
};
```

download.js:

```js
var InkaCrawler = require('../lib/inka-crawler').InkaCrawler;
var crawler = new InkaCrawler(require('./config'));

crawler.toObservable().subscribe(function(article) {
    // save to the mongodb, publish on message broker, etc.
});
```

## Limitations

As for now `inka.js` supports only pages that have full content of an article on article's listing. I would probably work on that.

## inka?

A friend of mine has a cat named "Inka" and a blog on which she had plenty of notes about the kitty
that she want to migrate to wordpress.com. I've decided  to help her with that. New blog about cats,
handmade works and sewing you can visit [here][1] (in Polish).


[1]: http://diywithacat.wordpress.com/