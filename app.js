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

app.get('/min/:url', _min);
app.post('/min', _min);

module.exports = http.createServer(app).listen('8363', function(){
  console.log('Express server listening on port 8363');
});

////////////////
// Routes.

function _min(req, res) {
  var url = req.param('url');
  min(url, function(err, content) {
    if (err) res.send(403, {
      message: String(err)
    });
    res.send(content);
  });
}
