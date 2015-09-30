var webpack = require('webpack');
var RewirePlugin = require('rewire-webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],

    singleRun: true,

    frameworks: [ 'should', 'mocha' ],

    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-should',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'dots' ],

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        modulesDirectories: ['.', 'node_modules', 'src']
      },
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/ },
          { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
          { test: /\.(png|jpg|woff|ttf|eot|svg|woff2)$/, loader: 'url-loader?limit=100000' }
        ]
      },
      plugins: [
        new RewirePlugin()
      ]
    },

    webpackServer: {
      noInfo: true
    }
  });
};