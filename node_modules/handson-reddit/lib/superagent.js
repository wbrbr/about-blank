var request = require('superagent');


function r (subreddit, cb) {
  request.get('http://reddit.com/r/' + subreddit + '.json', cb);
}

module.exports = {
  r: r
};