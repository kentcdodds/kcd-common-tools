/* eslint-env: node */
var _ = require('lodash');
var here = require('./here');

module.exports = function assignOverrides(dest, overrides, context) {
  if (!overrides) {
    return;
  }

  var w = overrides;

  if (_.isFunction(w)) {
    dest = w(dest);
  } else if (_.isObject(w) && w[context]) {
    _.merge(dest, w[context]);
  } else if (_.isString(w)) {
    return assignOverrides(require(here(w)));
  }
  return dest;
};
