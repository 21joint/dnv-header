const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const path = require('path');

module.exports = merge(webpackConfig, {

  devtool: 'eval',
  devServer: {
    watchContentBase: true,
    port: 7777,
    open: true
  }
});