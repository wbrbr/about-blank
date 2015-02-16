var request = require('request');


function r (subreddit, cb) {
  request.get('http://reddit.com/r/' + subreddit + '.json', cb);
}

module.exports = {
  r: r
};