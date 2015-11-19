/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

var webpack = require('webpack');
var path = require('path');
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = {

  output: {
    publicPath: '/checkout-instore/script/',
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
    new webpack.optimize.AggressiveMergingPlugin(),
    new AppCachePlugin({
      cache: [
        "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css",
        "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
        "https://io.vtex.com.br/front-libs/jquery/2.1.3/jquery.min.js",
        "https://vtexid.vtex.com.br/api/vtexid/pub/authentication/vtexid.min.js"
      ],
      output: 'appcache.mf'
    })
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
      loader: 'babel',
      query: {
        stage: 0,
        plugins: []
      }
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
