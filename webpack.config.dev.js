const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const path = require('path');
const conf = require('./conf');

module.exports = merge(webpackConfig, {
  devServer: {
    watchContentBase: true,
    port: 2121,
    open: true,
    publicPath: '/'
  },
  devtool: 'eval'
});