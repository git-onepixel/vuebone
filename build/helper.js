const path = require('path');
const config = require('../config');
const pages = require('../config/pages.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  createVueLoader(isProd) {
    const self = this;
    return {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          css: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: self.getStyleLoaders(isProd)
          })
        }
      }
    }
  },

  createStyleLoader(isProd) {
    const self = this;
    return {
      test: /\.(css|less)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'vue-style-loader',
        use: self.getStyleLoaders(isProd)
      })
    }
  },

  createImageLoader(filename) {
    return {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: filename
      }
    }
  },

  createFontLoader(filename) {
    return {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: filename
      }
    }
  },

  getStyleLoaders(isProd) {
    const env = isProd ? 'build' : 'dev';
    let loaders = ['css-loader', 'postcss-loader', 'less-loader'];
    return loaders.map(loader => {
      let options = {
        sourceMap: config[env].useSourceMap
      };
      if (loader === 'css-loader' && isProd) {
        options.minimize = true;
      }
      return { loader, options };
    })
  },

  createPageEntries() {
    const entry = {};
    pages.forEach(page => {
      const name = page.name;
      entry[name] = `./src/pages/${name}/${name}.js`;
    });
    return entry;
  },

  createHtmlWebpackPlugins(isProd) {
    const plugins = [];
    pages.forEach(page => {
      const name = page.name;
      plugins.push(
        new HtmlWebpackPlugin({
          title: page.title,
          template: path.join(__dirname, '../index.html'),
          filename: `${name}.html`,
          inject: true,
          chunks: ['common', 'vendor', 'manifest', name],
          chunksSortMode: 'dependency',
          minify: isProd ? {
            minifyJS: true,
            minifyCSS: true,
            collapseWhitespace: true,
          } : false
        })
      )
    });
    return plugins;
  }
}