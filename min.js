'use strict';

var path = require('path');
var UglifyJS = require('uglify-js');
var CleanCSS = require('clean-css');
var request = require('request');

exports.url = function(url, cb) {

  request(url, function(err, res, body) {
    if (err) {
      return cb(err);
    }
    if (res.statusCode != 200) {
      return cb(new Error('statusCode ' + res.statusCode + ' is not 200'));
    }

    var type = path.extname(url).slice(1);
    return cb(null, exports.content(body, type));
  });

};

exports.content = function(content, type) {
  if (type === 'js') {
    return UglifyJS.minify(content, {fromString: true}).code;
  }
  if (type === 'css') {
    return new CleanCSS().minify(content);
  }
}

