var expect  = require('chai').expect;
var sinon   = require('sinon');
var reddit  = require('../redwrap');
var request = require('request');
var fs      = require('fs');


describe('redwrap', function() {
  describe('.user()', function() {
    var open311;
    var json = fs.readFileSync(__dirname + '/mocks/user.json', 'utf8');

    beforeEach(function(done){
      sinon.stub(request, 'get');
      done();
    });

    afterEach(function(done){
      request.get.restore();
      done();
    });

    it('should fetch from the correct Reddit API url', function(done) {
      var mockRes = {statusCode: 200, body: json};
      request.get.callsArgWith(1, true, mockRes, mockRes.body);
      reddit.user('Stebon24', function(err, res, body) { /* do nothing */ });
      expect(request.get.firstCall.args[0]).to.equal('http://www.reddit.com/user/Stebon24.json');
      done();
    });
    
    it('should provide http response and body to the callback', function(done) {
      var mockRes = {statusCode: 200, body: json};
      request.get.callsArgWith(1, true, mockRes, mockRes.body);
      reddit.user('Stebon24', function(err, res, body) { 
        expect(res).to.equal(mockRes);
        expect(body).to.equal(json);
        done();
      });
    });   
  });
});