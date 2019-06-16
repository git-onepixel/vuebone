/**
 * @file build configuration
 */

const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const packageJson = require('../package.json');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ZipWebpackPlugin = require('zip-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'pages/[name].[chunkhash:8].js'
    },

    devtool: config.build.useSourceMap ? config.build.devtool : false,

    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: config.build.useSourceMap
        }),
    
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),

        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),

        new HtmlWebpackPlugin({
            title: packageJson.title,
            template: path.join(__dirname, '../src/layouts/index.html'),
            filename: 'index.html',
            inject: true,
            minify: {
                minifyJS: true,
                minifyCSS: true,
                removeComments: true,
                collapseWhitespace: true
            }
        }),

        new ZipWebpackPlugin({
            filename: 'vuebone.zip'
        })
    ]
});
