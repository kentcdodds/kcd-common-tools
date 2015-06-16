/* eslint-env node */
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var _ = require('lodash');

var assignOverrides = require('../utils/assign-overrides');
var here = require('../utils/here');

var packageJson = require(here('package.json'));
var kcdCommon = packageJson.kcdCommon || {};

var context = process.env.NODE_ENV || 'development';

var configFns = {
  development: getDevConfig,
  production: getProdConfig,
  test: getTestConfig,
  'test:ci': getTestCIConfig
};

var config = configFns[context]();
addCommonPlugins();
config = assignOverrides(config, kcdCommon.webpack, context);

console.log('building version %s in %s mode', packageJson.version, context);

module.exports = config;


function getDevConfig() {
  var exclude = /node_modules/;
  var devConfig = {
    context: here('src'),
    entry: './index.js',
    output: {
      filename: packageJson.main,
      libraryTarget: 'umd'
    },

    stats: {
      colors: true,
      reasons: true
    },

    externals: {
      chai: 'chai',
      'sinon-chai': 'sinonChai',
      sinon: 'sinon',
      lodash: '_'
    },

    plugins: [],

    resolve: {
      extensions: ['', '.js'],
      alias: {
        'angular-fix': here('src/angular-fix')
      }
    },

    module: {
      loaders: [
        {test: /\.html$/, loaders: getLoaders(['raw']), exclude: exclude},
        {test: /\.js$/, loaders: getLoaders(['ng-annotate', 'babel', 'eslint']), exclude: exclude}
      ]
    },
    eslint: {
      emitError: false,
      failOnError: false,
      failOnWarning: false,
      quiet: true
    }
  };

  if (process.env.ON_CI !== 'true') {
    devConfig.plugins = [
      new WebpackNotifierPlugin()
    ];
  }
  return devConfig;
}

function getProdConfig(noUglify) {
  var prodConfig = _.merge({}, getDevConfig(), {
    output: {
      filename: packageJson.main.replace(/\.js$/, '.min.js')
    },
    devtool: 'source-map',
    eslint: {
      emitError: true,
      failOnError: true
    }
  });

  prodConfig.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ];


  // allow getting rid of the UglifyJsPlugin
  // https://github.com/webpack/webpack/issues/1079
  if (!noUglify) {
    prodConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    }));
  }
  return prodConfig;
}

function getTestConfig() {
  return _.merge({}, getDevConfig(), {
    entry: './index.test.js',
    plugins: []
  });
}

function getTestCIConfig() {
  var noUglify = true;
  return _.merge({}, getProdConfig(noUglify), {
    entry: './index.test.js',
    module: {
      postLoaders: [
        {test: /\.js$/, loader: 'uglify', exclude: /\.test\.js$/}
      ]
    },
    'uglify-loader': {
      compress: {warnings: false}
    }
  });
}

function getLoaders(loaders) {
  return _.filter(loaders, function(loader) {
    return packageJson.devDependencies.hasOwnProperty(loader + '-loader');
  });
}

function addCommonPlugins() {
  config.plugins = config.plugins || [];

  config.plugins.unshift(new webpack.BannerPlugin(getBanner(), {raw: true}));
  // put the global variables before everything else
  config.plugins.unshift(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    VERSION: JSON.stringify(packageJson.version)
  }));
}

function getBanner() {
  return '//! ' + packageJson.name + ' version ' +
    packageJson.version +
    ' built with ♥ by ' +
    (packageJson.contributors || [packageJson.author]).join(', ') +
    ' (ó ì_í)=óò=(ì_í ò)\n';
}
