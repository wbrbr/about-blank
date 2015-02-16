require('mocha'),
require('should');


var request = require('superagent'); // for sanity check only

var REDDIT_USERNAME = process.env.REDDIT_USERNAME || 'test';
var REDDIT_PASSWORD = process.env.REDDIT_PASSWORD || 'test123';

console.log(REDDIT_USERNAME);

describe('sanity check', function () {
  it('gets r/funny', function (done) {
    request.get('http://reddit.com/r/funny', function (err, res) {
      if (err) { throw err; }
      done();
    });
  });
});

var Reddit = require('../index.js');

// request option

describe('request tests', function () {

  var reddit = new Reddit();

  describe('gets a variety of subreddits', function () {
    it('gets r/funny', function (done) {
      reddit.r('funny', function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
    it('gets r/random', function (done) {
      reddit.r('random', function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
    it('gets r/politics', function (done) {
      reddit.r('politics', function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
    it('gets r/IAmA', function (done) {
      reddit.r('IAmA', function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
  });

  describe('supports chaining', function () {
    it('gets r/funny new', function (done) {
      reddit.r('funny').new().exec(function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
    it('gets r/funny controversial', function (done) {
      reddit.r('funny').controversial().exec(function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
    it('gets r/funny top', function (done) {
      reddit.r('funny').top().exec(function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
  });

  describe('can log in', function () {
    it('logs in with correct password', function (done) {
      reddit.login(REDDIT_USERNAME, REDDIT_PASSWORD, function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
    it('gets login error with incorrect password', function (done) {
      reddit.login(REDDIT_USERNAME, '4567', function (err, res) {
        if (err) { throw err; }G
        done();
      });
    });
  });

  describe('can get information about loggedin user', function () {
    it('logs in and gets information', function (done) {
      reddit.login(REDDIT_USERNAME, REDDIT_PASSWORD, function (err, res) {
        if (err) { throw err; }
        reddit.me(function (err, res) {
          if (err) { throw err; }
          done();
        });
      });
    });
  });

});

// superagent option

describe('superagent tests', function () {
  var reddit2 = new Reddit({ strategy: "superagent" });

  describe('gets a variety of subreddits', function () {
    it('gets r/funny', function (done) {
      reddit2.r('funny', function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
    it('gets r/random', function (done) {
      reddit2.r('random', function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
    it('gets r/politics', function (done) {
      reddit2.r('politics', function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
    it('gets r/IAmA', function (done) {
      reddit2.r('IAmA', function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
  });

  describe('supports chaining', function () {
    it('gets r/funny new', function (done) {
      reddit2.r('funny').new().exec(function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
    it('gets r/funny controversial', function (done) {
      reddit2.r('funny').controversial().exec(function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
    it('gets r/funny top', function (done) {
      reddit2.r('funny').top().exec(function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
  });

  describe('can log in', function () {
    it('logs in with correct password', function (done) {
      reddit2.login(REDDIT_USERNAME, REDDIT_PASSWORD, function (err, res) {
        if (err) { throw err; }
        done();
      });
    });
    it('gets login error with incorrect password', function (done) {
      reddit2.login(REDDIT_USERNAME, '4567', function (err, res) {
        if (err) { throw err; }G
        done();
      });
    });
  });

  describe('can get information about loggedin user', function () {
    it('logs in and gets information', function (done) {
      reddit2.login(REDDIT_USERNAME, REDDIT_PASSWORD, function (err, res) {
        if (err) { throw err; }
        reddit2.me(function (err, res) {
          if (err) { throw err; }
          done();
        });
      });
    });
  });
});
