var webpack           = require('webpack');
var config            = require('config');
var merge             = require('webpack-config-merger');
var baseConfig        = require('./webpack.base.js');
var patterns          = require('css-patterns');
var path              = require('path');

var WP_PORT = config.get('webpackServer.port');

module.exports = merge(baseConfig, {
  devtool: 'eval',
  debug: true,
  entry: [
      'webpack-dev-server/client?http://localhost:' + WP_PORT,
      'webpack/hot/only-dev-server',
      './src/js/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader?stage=0'],
        exclude: [/node_modules/, /config/]
      },
      {
        test: /.?css$/,
        loaders: [
          'style',
          'css',
          'autoprefixer-loader?browsers=last 3 versions',
          'sass?outputStyle=expanded&includePaths[]=' + path.resolve(patterns.includePaths[0])
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
