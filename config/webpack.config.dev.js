const baseConfig = require('./webpack.config.js');

const devConfig = Object.assign({}, baseConfig, {
    mode: 'development',
    devtool: 'eval',
    devServer: {
        contentBase: baseConfig.output.path,
        compress: true,
        port: 3000,
        publicPath: '/',
        historyApiFallback: true,
        https: false,
        hot: true,
        overlay: {
            warnings: true,
            errors: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules)/,
                use: 'babel-loader',
            },
            {
                test: /\.css$|\.scss$/,
                use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
            },
            {
                test: /\.(jpg|png|svg|woff|woff2|eot|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/',
                        publicPath: '/assets/',
                    },
                },
            },
        ],
        noParse: [/\.min\.js/],
    },
});

module.exports = devConfig;
