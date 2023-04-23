const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');

const devConfig = merge(baseConfig, {
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    mode: "development",
    devtool: "source-map",
    devServer: {
        port: 'auto',
        compress: true,
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'assets/index.html')
        }),
    ],
});

module.exports = devConfig;
