/**
 * @file prod conf
 * @author onepixel
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ZipWebpackPlugin = require('zip-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const pkg = require('../package.json');
const config = require('./config');
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
      helper.createImageLoader(
        assetsPath('img/[name].[contenthash:8].[ext]'),
      ),
      helper.createFontLoader(
        assetsPath('fonts/[name].[contenthash:8].[ext]'),
      ),
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

    helper.createHtmlWebpackPlugin(true),

    new ZipWebpackPlugin({
      filename: `${pkg.name}.zip`,
    }),
  ],
});
