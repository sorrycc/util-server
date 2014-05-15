'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var min = require('./min');
var busboy = require('connect-busboy');

app.use(bodyParser());
app.use(logger());
app.use(busboy());

app.get('/', function(req, res) {
  res.send('hello');
});

app.get('/min/:url', _min);
app.post('/min', _min);
app.put('/min', _putMin);

module.exports = http.createServer(app).listen('8363', function(){
  console.log('Express server listening on port 8363');
});

////////////////
// Routes.

function _putMin(req, res) {
  var buf = [];
  req.pipe(req.busboy);
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    file.on('data', function(data) {
      buf.push(data);
    });
    file.on('end', function() {
      var type = path.extname(filename).slice(1);
      var content = Buffer.concat(buf).toString();
      res.send(min.content(content, type));
    });
  });
}

function _min(req, res) {
  var url = req.param('url');
  min.url(url, function(err, content) {
    if (err) res.send(403, {
      message: String(err)
    });
    res.send(content);
  });
}
