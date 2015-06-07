var self = module.exports = {
    url: 'http://inkathecat.blox.pl/html',
    rootUrl: 'http://inkathecat.blox.pl/', // for links starting with "/"
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
        shouldDownloadLink: function($) {
            return $('a').text() == '»';
        },
        extractUrlFromLink: function($) {
            return $('a').attr('href');
        }
    }
};