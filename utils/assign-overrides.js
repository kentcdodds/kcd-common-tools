/* eslint-env: node */
var _ = require('lodash');
var here = require('./here');

module.exports = function assignOverrides(dest, overrides, context) {
  /* eslint complexity:[2, 6] */
  if (!overrides) {
    return dest;
  }

  if (_.isFunction(overrides)) {
    dest = overrides(dest);
  } else if (_.isString(overrides)) {
    dest = assignOverrides(dest, require(here(overrides)), context);
  } else if (_.isObject(overrides) && overrides[context]) {
    _.merge(dest, overrides[context]);
  } else if (_.isObject) {
    _.merge(dest, overrides);
  } else {
    throw new Error('overrides must be a function, string, or object');
  }
  return dest;
};
