var Promise = require('promise');
var request = require('request');

module.exports.HttpPromise = function(url) {
    return new Promise(function(resolve, reject) {
        return request({
            url: url,
            json: false
        }, function(err, res, body) {
            if (err) reject(err);
            else resolve(body);
        });
    });
};
