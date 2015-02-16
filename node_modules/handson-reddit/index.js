var strategies = require('./lib/strategies');


var Reddit = function Reddit (options) {
  return strategies[(options && options.strategy) ? options.strategy : 'request'];
};

module.exports = Reddit;