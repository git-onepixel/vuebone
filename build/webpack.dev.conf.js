/**
 * @file dev configuration
 */

const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const packageJson = require('../package.json');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    output: {
        publicPath: config.dev.assetsPublicPath,
        filename: 'js/[name].js',
        chunkFilename: 'pages/[name].js'
    },

    devtool: config.dev.useSourceMap ? config.dev.devtool : false,

    devServer: {
        hot: true,
        host: config.dev.host,
        port: process.env.PORT || config.dev.port,
        proxy: config.dev.proxyTable,
        historyApiFallback: true,
        quiet: true
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),

        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),

        new webpack.HotModuleReplacementPlugin(),

        new FriendlyErrorsPlugin(),

        new HtmlWebpackPlugin({
            title: packageJson.title,
            template: path.join(__dirname, '../src/layouts/index.html'),
            filename: 'index.html',
            inject: true
        })
    ]
});
