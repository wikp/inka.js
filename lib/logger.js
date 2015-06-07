var colors = require('./colors');
var util = require('util');
var _ = require('underscore');

module.exports = {
    debug: function(msg) {
        log(msg, "debug", arguments);
    },
    info: function(msg) {
        log(msg, "info", arguments);
    },
    warn: function(msg) {
        log(msg, "warn", arguments);
    },
    error: function(msg) {
        log(msg, "error", arguments);
    },
    verbose: function(msg) {
        log(msg, "verbose", arguments);
    },
    input: function(msg) {
        log(msg, "input", arguments);
    },
    prompt: function(msg) {
        log(msg, "prompt", arguments);
    },
    data: function(msg) {
        log(msg, "data", arguments);
    },
    help: function(msg) {
        log(msg, "help", arguments);
    },
    silly: function(msg) {
        log(msg, "silly", arguments);
    }
};

function log(msg, theme, arguments) {
    return util.log(util.format(msg, _.rest(arguments))[theme]);
}
