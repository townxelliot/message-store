var path = require('path');

var chai = require('chai');
var expect = chai.expect;
chai.should();

var Promise = require('bluebird');
var request = require('supertest');
var portfinder = require('portfinder');

var findPort = Promise.promisify(portfinder.getPort);

// test code
var startApp = require(path.join('..', '..', 'src', 'app'));
var HOSTNAME = 'localhost';

// tests for /messages URLs
describe('messages API', function () {

  // set to a fresh instance of the app before each test
  var server;

  // restart the server (and clear the database, as it's in memory) before each
  // test
  beforeEach(function (done) {
    findPort()
      .then(function (port) {
        return startApp(null, HOSTNAME, port);
      })
      .then(function (httpServer) {
        server = httpServer;
        done();
      });
  });

  afterEach(function (done) {
    if (server) {
      server.close(done);
    }
  });

  it('should accept POST of a message and GET its content', function (done) {
    var message = 'my first message';

    var req = request(server);

    // create the message
    req.post('/messages')
      .send(message)
      .end(function (err, res) {
        expect(err).to.equal(null);

        // retrieve the created message from the JSON
        var id = res.body.id;
        id.should.equal(1);

        req.get('/messages/' + id)
          .end(function (err, res) {
            res.status.should.equal(200);
            res.text.should.eql(message);
            done(err);
          });
      });
  });

  it('should reject a POST with no body', function (done) {
    request(server)
      .post('/messages')
      .end(function (err, res) {
        res.status.should.equal(400);
        done(err);
      });
  });

  it('should return error for GET on non-existent ID', function (done) {
    request(server)
      .get('/messages/1')
      .end(function (err, res) {
        res.status.should.equal(404);
        done(err);
      });
  });

  it('should reject a GET for non-numeric ID', function (done) {
    request(server)
      .get('/messages/xxxx')
      .end(function (err, res) {
        res.status.should.equal(400);
        done(err);
      });
  });

});

