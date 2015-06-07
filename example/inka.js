#!/usr/bin/env node

var _ = require('underscore');

var InkaCrawler = require('../lib/inka-crawler').InkaCrawler;
var crawler = new InkaCrawler(require('./config'));

crawler.toObservable()
    .map(function(article) {
        return _.mapObject(article, function (val) {
            return val.trim();
        });
    })
    .subscribe(function (article) {
        console.log('----------------------------------------------------------------------');
        console.log("title:", article.title);
        console.log("date", article.date);
        console.log("body", article.body.substring(0, 100));
        console.log('----------------------------------------------------------------------');
    });