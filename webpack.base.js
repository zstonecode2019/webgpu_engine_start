const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/main.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        // clean: true
    },
    // optimization: {
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'all',
    //             },
    //         },
    //     },
    // },
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
            "@": path.resolve(__dirname, 'src'),
        },
        extensions: ['.ts', '.js', '.json', '.wasm', '.vue'],
    },
    // mode: "development",
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // hotReload: false // 关闭热重载
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }, {
                    loader: 'ts-loader',
                    options: { appendTsSuffixTo: [/\.vue$/] }
                }]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            {
                test: /\.glsl$/i,
                use: 'raw-loader'
            },
            {
                test: /\.wgsl$/i,
                use: 'ts-shader-loader'
            }
        ]
    },
    // devServer: {
    //     port: 8080,
    //     compress: true,
    //     static: {
    //         directory: path.join(__dirname, 'public'),
    //     },
    // },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'assets/index.html')
        // }),
        new webpack.DefinePlugin({
            // Definitions...
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        })
    ],
}