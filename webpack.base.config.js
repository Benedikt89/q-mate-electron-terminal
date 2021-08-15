'use strict';

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: ['.jsx', '.tsx', '.ts', '.js', '.json']
    },
    devtool: 'source-map',
    plugins: [
    ],
    target: 'node',
    externals: [nodeExternals({
        modulesFromFile: true,
        whitelist: [
            /hot/, /^lodash/, /babel/,
            /^core-js/, /react/,
            /moment/, /^i18next/, /webpack/,
            'axios', /@material/
        ]
    })]
};
