'use strict';

var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var min = require('./min');

app.use(bodyParser());
app.use(logger());

app.get('/', function(req, res) {
  res.send('hello');
});

app.get('/min/:url', function(req, res) {
  var url = req.param('url');
  _min(url, res);
});

app.post('/min', function(req, res) {
  var url = req.param('url');
  _min(url, res);
});

http.createServer(app).listen('3000', function(){
  console.log('Express server listening on port 3000');
});

////////////////
// Helpers

function _min(url, res) {
  min(url, function(err, content) {
    if (err) res.send(403, {
      message: String(err)
    });
    res.send(content);
  });
}
