'use strict';

const webpack = require('webpack'),
      path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcPath = path.join(__dirname, '../src/'),
      distPath = path.join(__dirname, '../dist/');

module.exports = {
    context: srcPath,
    entry: {
        app: './app.jsx',
    },
    output: {
        path: distPath,
        filename: '[name].js',
        publicPath: '',
    },
    resolve: {
        modules: ["node_modules", srcPath],
        extensions: [".js", ".json", ".jsx", ".css", ".scss"],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new WebpackPwaManifest({
            name: "Bulls & Cows",
            short_name: "b&c",
            description: "Bulls & Cows game",
            lang: "en-US",
            display: "fullscreen",
            orientation: "portrait",
            start_url: './',
            background_color: '#f0f0f0',
            theme_color: "#f0f0f0",
            'theme-color': '#f0f0f0',
            icons: [
                {
                    src: path.resolve('src/assets/icons/icon.png'),
                    sizes: [16, 32, 57, 60, 72, 76, 96, 114, 120, 144, 152, 180, 192],
                    destination: path.join('assets', 'icons')
                }
            ],
            fingerprints: false,
        }),
        new CopyWebpackPlugin([
            { from: 'service-worker.js', to: distPath },
            { from: path.join(srcPath, 'assets'), to: path.join(distPath, 'assets') }
        ]),
    ]
};
