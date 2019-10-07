/**
 * @file prod conf
 * @author onepixel
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipWebpackPlugin = require('zip-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package.json');
const config = require('../config');
const helper = require('./helper');

const assetsPath = (filename) => `${config.build.assetsSubDirectory}/${filename}`;

module.exports = merge(baseWebpackConfig, {

  output: {
    path: config.build.assetsRoot,
    filename: assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: assetsPath('pages/[name].[chunkhash:8].js'),
  },

  devtool: config.build.useSourceMap ? config.build.devtool : false,

  module: {
    rules: [
      helper.createVueLoader(true),
      helper.createStyleLoader(true),
      helper.createImageLoader(assetsPath('img/[name].[contenthash:8].[ext]')),
      helper.createFontLoader(assetsPath('fonts/[name].[contenthash:8].[ext]')),
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: config.build.env,
      },
    }),

    new ExtractTextPlugin({
      filename: assetsPath('css/[name].[contenthash:8].css'),
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: config.build.useSourceMap,
    }),

    new HtmlWebpackPlugin({
      title: pkg.name,
      template: path.join(__dirname, '../config/template.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        collapseWhitespace: true,
      },
    }),

    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../public'),
        to: path.join(__dirname, '../dist'),
      },
    ]),

    new ZipWebpackPlugin({
      filename: `${pkg.name}_prod.zip`,
    }),
  ],
});
