'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

var readFileAsync = function readFileAsync(filename) {
    return new _promise2.default(function (resolve, reject) {
        fs.readFile(filename, function (err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

module.exports = {
    readFileAsync: readFileAsync
};