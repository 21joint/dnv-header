'use strict';
const path = require('path');
const conf = require('./conf');
const IS_DEV = (process.env.NODE_ENV === 'dev');
const webpack = require('webpack');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

const getNameFromDir = (dir) => {
  const lastSlash = dir.lastIndexOf('/');
  return dir.slice(lastSlash + 1);
};

const generateHTMLPlugins = () =>
    glob.sync('./src/*.ejs').map(function(dir) {
      return new HtmlWebpackPlugin({
        template: path.resolve(conf.dirSrc, getNameFromDir(dir)),
      });
    });

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    vendor: path.join(conf.dirSrc, 'scripts/vendor.js'),
    common: path.join(conf.dirSrc, 'scripts/common.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    modules: [
      conf.dirSrc,
      conf.dirNode,
    ],
    alias: {
      '@': path.resolve(__dirname, 'node_modules'),
      '~': path.resolve(__dirname, 'node_modules'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      // SCSS
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV,
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: IS_DEV,
                root: conf.dirSrc
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: IS_DEV,
                plugins: [
                  autoprefixer({browsers: ['last 3 versions', 'iOS 9']}),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: IS_DEV,
              },
            }],
          // use style-loader in development
          fallback: {
            loader: 'style-loader',
          },
          publicPath: '/'
        }),
      },
      // IMAGES
      {
        test: /\.(gif|png|jpe?g)/,
        loader: 'file-loader',
        include: conf.dirSrc,
        options: {
          name: '[name].[ext]',
          outputPath: './images/',
        },
      },
      // FONTS
      {
        test: /\.(ttf|eot|woff|woff2|svg)/,
        loader: 'file-loader',
        include: conf.dirSrc,
        options: {
          name: '[name].[ext]',
          outputPath: './fonts/',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].css',
      disable: IS_DEV,
    }),
    ...generateHTMLPlugins(),
    new HtmlWebpackInlineSVGPlugin(),
  ],
  stats: {
    colors: true,
  },
};
