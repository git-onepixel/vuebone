/**
 * @file base configuration
 */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '../src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: 'async',
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (
          module.resource
          && /\.js$/.test(module.resource)
          && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      },
      chunks: ['app', 'async-app'],
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),

    new CopyWebpackPlugin([{
      from: 'public',
    }], {
      ignore: ['*.html'],
    }),
  ],
};
