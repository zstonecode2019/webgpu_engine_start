const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');

const prodConfig = merge(baseConfig, {
    mode: "production",
    output: {
        clean: true, // Clean the output directory before emit.
    },
});

module.exports = prodConfig;
