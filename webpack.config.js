const config = require('./project.config');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');
// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'development');

const getNameFromDir = (dir) => {
  const lastSlash = dir.lastIndexOf('/');
  return path.join(config.dirSrc, dir.slice(lastSlash + 1));
};

const generateHTMLPlugins = () =>
    glob.sync(path.join(config.dirSrc, '*.ejs')).map(function(dir) {

      return new HtmlWebpackPlugin({
        template: getNameFromDir(dir),
        prefix: 'dnv',
        appTitle: config.appTitle
      });
    });

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    vendor: path.join(config.dirSrc, 'scripts/vendor.js'),
    common: path.join(config.dirSrc, 'scripts/common.js'),
  },
  resolve: {
    modules: [
      config.dirNode,
      config.dirSrc,
      config.dirAssets,
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      // CSS / SASS
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              data: '$prefix: ' + config.cssPrefix + ';',
              sourceMap: IS_DEV,
            },
          },
        ],
      },
      {
        test: /\.css/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: IS_DEV,
              parser: 'cssnano',
              exec: true
            },
          },
        ],
      },

      // IMAGES
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      // FONTS
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV,
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(config.dirSrc, 'assets'),
        to: './',
      }]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    ...generateHTMLPlugins(),
  ],
  stats: {
    colors: true,
  },
    devServer: {
        watchContentBase: true,
        port: 7777,
        open: true
    },
};
