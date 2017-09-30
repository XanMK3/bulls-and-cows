'use strict';

const baseConfig = require('./webpack.config.js');

const devConfig = Object.assign({}, baseConfig, {
    devtool: 'eval',
    devServer: {
        contentBase: baseConfig.output.path,
        compress: true,
        port: 3000,
        publicPath: '/',
        historyApiFallback: true,
        https: false,
        overlay: {
            warnings: true,
            errors: true
        },
    },
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules)/,
                use: "babel-loader",
            },
            {
                test: /\.css$|\.scss$/,
                use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            },
        ],
        noParse: [/\.min\.js/]
    },
});

module.exports = devConfig;
