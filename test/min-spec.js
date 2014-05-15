'use strict';

var fs = require('fs');
var exec = require('child_process').exec;

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
    exec('curl http://localhost:8363/min/https%3A%2F%2Fs.tbcdn.cn%2Fcdnstatus.js', function(err, result) {
      result.should.be.eql('g_prefetch(!0,[],.1);');
      done();
    });
  });

  it('post', function(done) {
    exec('curl -d "url=http://a.tbcdn.cn/cdnstatus.js" http://localhost:8363/min', function(err, result) {
      result.should.be.eql('g_prefetch(!0,[],.1);');
      done();
    });
  });

  it('put', function(done) {
    exec('curl -X PUT -F "f=@test/fixtures/cdnstatus.js" http://localhost:8363/min', function(err, result) {
      result.should.be.eql('g_prefetch(!0,[],.1);');
      done();
    });
  });

});
