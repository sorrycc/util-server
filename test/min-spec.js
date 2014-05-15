'use strict';

var request = require('request');
var fs = require('fs');

describe('min', function() {

  var server;

  before(function(done) {
    server = require('../app');
    server.on('listening', done);
  });

  after(function() {
    server && server.close();
    server = null;
  });

  it('get', function(done) {
    request('http://localhost:8363/min/https%3A%2F%2Fs.tbcdn.cn%2Fcdnstatus.js', function(err, res, body) {
      body.should.be.eql('g_prefetch(!0,[],.1);');
      done();
    });
  });

  it('post', function(done) {
    request({
      url: 'http://localhost:8363/min',
      method: 'post',
      form: {
        url: 'https://s.tbcdn.cn/cdnstatus.js'
      }
    }, function(err, res, body) {
      body.should.be.eql('g_prefetch(!0,[],.1);');
      done();
    })
  });

});
