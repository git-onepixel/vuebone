/**
 * @file configuration.
 */

const path = require('path');

module.exports = {
    build: {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        useSourceMap: false,
        devtool: '#source-map'
    },

    dev: {
        host: '0.0.0.0',
        env: require('./dev.env'),
        port: 8080,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        useSourceMap: true,
        devtool: '#cheap-module-eval-source-map'
    },

    styleLoaders() {
        let isProd = process.env.NODE_ENV === this.build.env;
        let env = isProd ? 'build' : 'dev';
        let loaders = ['css-loader', 'postcss-loader', 'less-loader'];
        return loaders.map(loader => {
            let options = {
                sourceMap: this[env].useSourceMap
            };
            if (loader === 'css-loader' && isProd) {
                options.minimize = true;
            }
            return { loader, options };
        })
    }
};

