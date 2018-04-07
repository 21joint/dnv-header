const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'scripts/[name][chunkhash].js',
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  devtool: 'source-map',
});
