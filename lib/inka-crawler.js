var Rx = require('rx');
var logger = require('./logger');
var Promise = require('./http-promise').HttpPromise;
var cheerio = require('cheerio');
var EventEmitter = require('events').EventEmitter;

var InkaCrawler = exports.InkaCrawler = function(c) {
    this.config = c;
};

var eventEmitter = new EventEmitter();

var linkStreamObserver = Rx.Observer.create(
    function (link) {
        eventEmitter.emit('new-url', link);
    }, function (err) {
        logger.error('Houston, we have a problem in the linkStream: ', err);
    }, function () {
        logger.info('linkStream finished');
    });

InkaCrawler.prototype = {};
InkaCrawler.prototype.toObservable = function () {
    var self = this;

    logger.debug("Running with config: %j", this.config);

    var bodyStream = Rx.Observable.fromEvent(eventEmitter, 'new-url')
        .startWith(this.config.url)
        .debounce(this.config.debounce)
        .flatMap(function (url) {
            return Rx.Observable.fromPromise(new Promise(url));
        })
        .flatMap(function(body) {
            return Rx.Observable.of(cheerio.load(body));
        });

    bodyStream
        .flatMap(function($) {
            return Rx.Observable.from($(self.config.selectors.links).toArray());
        })
        .map(function(link) {
            return cheerio.load(link);
        })
        .filter(self.config.callbacks.shouldDownloadLink)
        .map(self.config.callbacks.extractUrlFromLink)
        .map(function (url) {
            if (url.indexOf(self.config.rootUrl)) {
                return self.config.rootUrl + url;
            }

            return url;
        }).subscribe(linkStreamObserver);

    return bodyStream
        .flatMap(function($) {
            return Rx.Observable.from($(self.config.selectors.article).toArray());
        })
        .map(function (article) {
            return cheerio.load(article);
        })
        .map(this.config.callbacks.toArticle);

};



