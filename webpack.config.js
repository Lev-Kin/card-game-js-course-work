const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './index.js',
    module: {
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(js)$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Bild',
            inject: 'body'
        })
    ],
    stats: {
        children: true
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}
