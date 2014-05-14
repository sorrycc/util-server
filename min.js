'use strict';

var path = require('path');
var UglifyJS = require('uglify-js');
var CleanCSS = require('clean-css');
var request = require('request');

module.exports = function (url, cb) {

  request(url, function(err, res, body) {
    if (err) {
      return cb(err);
    }
    if (res.statusCode != 200) {
      return cb(new Error('statusCode ' + res.statusCode + ' is not 200'));
    }

    var extname = path.extname(url);
    if (extname === '.js') {
      return cb(null, UglifyJS.minify(body, {fromString: true}).code);
    }
    if (extname === '.css') {
      return cb(null, new CleanCSS().minify(body));
    }
  });

};

