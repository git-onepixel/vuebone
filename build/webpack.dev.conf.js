/**
 * @file dev conf
 * @author onepixel
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package.json');
const config = require('../config');
const helper = require('./helper');

const assetsPath = (filename) => `${config.dev.assetsSubDirectory}/${filename}`;

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: config.dev.assetsPublicPath,
    filename: assetsPath('js/[name].js'),
    chunkFilename: assetsPath('pages/[name].js'),
  },

  devtool: config.dev.useSourceMap ? config.dev.devtool : false,

  module: {
    rules: [
      helper.createVueLoader(),
      helper.createStyleLoader(),
      helper.createImageLoader(assetsPath('img/[name].[ext]')),
      helper.createFontLoader(assetsPath('fonts/[name].[ext]')),
    ],
  },

  devServer: {
    hot: true,
    host: config.dev.host,
    port: process.env.PORT || config.dev.port,
    proxy: config.dev.proxyTable,
    historyApiFallback: true,
    quiet: true,
  },

  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: config.dev.env,
      },
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].css',
    }),

    new webpack.HotModuleReplacementPlugin(),

    new FriendlyErrorsPlugin(),

    new HtmlWebpackPlugin({
      title: pkg.name,
      template: path.join(__dirname, '../config/template.html'),
      filename: 'index.html',
      inject: true,
    }),
  ],

});
