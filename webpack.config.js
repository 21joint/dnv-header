const config = require('./project.config');
const path = require('path');
const webpack = require('webpack');
const IS_DEV = (process.env.NODE_ENV === 'dev');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'styles/[name].css',
  disable: IS_DEV,
});

const glob = require('glob');
// Is the current build a development build

const getNameFromDir = (dir) => {
  const lastSlash = dir.lastIndexOf('/');
  return dir.slice(lastSlash + 1);
};

const generateHTMLPlugins = () =>
    glob.sync(path.join(config.dirSrc, '*.ejs')).map(function(dir) {
      return new HtmlWebpackPlugin({
        template: path.resolve(config.dirSrc, getNameFromDir(dir)),
        prefix: 'wbv',
        title: config.appTitle,
      });

    });

/**
 * Webpack Configuration
 */
module.exports = {
  target: 'web',
  entry: {
    vendor: path.join(config.dirSrc, 'scripts/vendor.js'),
    common: path.join(config.dirSrc, 'scripts/common.js'),
  },
  resolve: {
    modules: [
      config.dirNode,
      config.dirSrc,
      config.dirAssets
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      // SCSS
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV ? true : 'inline'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: IS_DEV ? true : 'inline',
                plugins: [
                  autoprefixer({browsers: ['last 3 versions', 'iOS 9']}),
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: IS_DEV ? true : 'inline',
                data: '$prefix: "' + config.cssPrefix + '";',
              },
            }],
          // use style-loader in development
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true,
              convertToAbsoluteUrls: true
            }
          },
        }),
      },
      // IMAGES
      {
        test: /\.(gif|png|jpe?g|svg)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './images/',
        },
      },
      // FONTS
      {
        test: /\.(ttf|eot|woff|woff2|svg)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './fonts/',
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/assets/',
        to: './',
        ignore: ['*.scss'],
      },
    ]),
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    extractSass,
    ...generateHTMLPlugins(),

  ],
  stats: {
    colors: true,
  },
  devtool: 'eval',
};
