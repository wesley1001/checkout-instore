var webpack = require('webpack');
var path = require('path');
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js',
    publicPath: '/checkout-instore/script/'
  },

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

  eslint: {
    configFile: '.eslintrc'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],

    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|woff|ttf|eot|svg|woff2)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new AppCachePlugin({
      cache: [
        "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css",
        "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
      ],
      fallback: [
        " "
      ],
      output: 'appcache.mf'
    })
  ],

  quiet: true,
  noInfo: true,

  proxy: {
    '*': {
      target: 'http://janus-edge.vtex.com.br/'
    }
  }
};
