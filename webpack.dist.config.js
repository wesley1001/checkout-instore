/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    publicPath: '/script/',
    path: 'build/checkout-instore/script/',
    filename: 'app.js'
  },

  debug: false,
  devtool: false,
  entry: './src/index.js',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'actions': path.join(__dirname, '/src/actions/'),
      'assets': path.join(__dirname, '/src/assets/'),
      'components': path.join(__dirname, '/src/components/'),
      'pages': path.join(__dirname, '/src/pages/'),
      'stores': path.join(__dirname, '/src/stores/'),
      'styles': path.join(__dirname, '/src/styles/'),
      'utils': path.join(__dirname, '/src/utils/')
    }
  },

  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.(png|jpg|svg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};