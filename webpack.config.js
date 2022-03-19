"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const path = require("path");
const buildConfig = require('@codification/cutwater-build-web').getConfig();
const isProduction = buildConfig.production;
const webpackConfiguration = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        'index':  path.join(__dirname, buildConfig.srcFolder, 'EventWriterHandler.js')
    },
    output: {
        libraryTarget: 'umd',
        path: path.join(__dirname, buildConfig.distFolder),
        filename: `[name].js`,
        sourceMapFilename: "[name].js.map"
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devtool: isProduction ? undefined : 'inline-source-map',
    optimization: {
        minimize: false,
    },
    target: 'node',
    externals: ['aws-sdk'],
    plugins: [new webpack.IgnorePlugin(/^electron$/)]
};
module.exports = webpackConfiguration;