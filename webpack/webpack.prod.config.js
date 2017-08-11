'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./webpack.config.js');

const prodConfig = Object.assign({}, baseConfig, {
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules)/,
                use: "babel-loader",
            },
            {
                test: /\.css$|\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
                })
            }
        ],
        noParse: [/\.min\.js/]
    },
});

prodConfig.plugins.push(new ExtractTextPlugin('main.css'));

module.exports = prodConfig;
