const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    target = 'browserslist';
}

if (process.env.SERVE === 'true webpack serve') {
    plugins.push(new ReactRefreshWebpackPlugin());
}

const plugins = [
    new HtmlWebpackPlugin({

    }),
    new MiniCssExtractPlugin({

    }),
];

module.exports = {
    mode,
    target,
    plugins,
    entry: './index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        hot: true,
    },
    stats: {
        children: true
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: mode === 'production' ? 'asset' : 'asset/resource',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },
}