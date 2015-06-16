/* eslint-env node */
var path = require('path');

var _ = require('lodash');
var assignOverrides = require('../utils/assign-overrides');
var here = require('../utils/here');

var packageJson = require(here('package.json'));
var kcdCommon = packageJson.kcdCommon || {};

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var coverage = process.env.COVERAGE === 'true';
var ci = process.env.NODE_ENV === 'test:ci';
if (coverage) {
  console.log('-- recording coverage --');
}

var webpackConfig = getTestWebpackConfig();
var entry = path.join(webpackConfig.context, webpackConfig.entry);

module.exports = function(config) {
  var defaultConfig = {
    basePath: './',
    frameworks: filterDevDeps(['sinon-chai', 'chai', 'mocha', 'sinon'], 'karma-'),
    files: [
      entry
    ],
    exclude: [],
    preprocessors: {
      './src/**/*.test.js': ['webpack']
    },
    reporters: getReporters(),
    webpack: webpackConfig,
    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'},
        {type: 'text-summary'}
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: !ci,
    browsers: ['Firefox'],
    singleRun: ci,
    browserNoActivityTimeout: 180000,
    plugins: filterDevDeps([
      'karma-webpack',
      'karma-mocha',
      'karma-sinon-chai',
      'karma-sinon',
      'karma-chai',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ])
  };

  defaultConfig = assignOverrides(defaultConfig, kcdCommon.karma, process.env.NODE_ENV);

  config.set(defaultConfig);
};

function getReporters() {
  var reps = ['progress'];
  if (coverage) {
    reps.push('coverage');
  }
  return reps;
}

function getTestWebpackConfig() {
  var testWebpackConfig = require('./webpack.config');

  if (coverage) {
    // I can't think of a more appropriate name that matches the file naming convention... meh...
    var testUtilsRegex = /test\.utils\.js/;

    // only run this through test files
    testWebpackConfig.module.loaders[1].exclude = /node_modules|^((?!\.(test|mock)\.).)*$/i;
    testWebpackConfig.module.loaders.push({
      test: /^((?!\.(test|mock)\.).)*$/i, // all files not containing ".test." or ".mock."
      include: here('src'),
      loaders: filterDevDeps(['isparta', 'ng-annotate'], undefined, '-loader'),
      exclude: testUtilsRegex
    });

    testWebpackConfig.module.loaders.push({
      test: testUtilsRegex,
      include: here('src'),
      loaders: filterDevDeps(['babel', 'eslint'], undefined, '-loader')
    });
  }

  return testWebpackConfig;

}

function filterDevDeps(devDeps, prefix, suffix) {
  return _.filter(devDeps, function(devDep) {
    return packageJson.devDependencies.hasOwnProperty((prefix || '') + (devDep || '') + (suffix || ''));
  });
}

