"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const path = require("path");
const webpackTask = require('@codification/cutwater-build-webpack').webpack;
const isProduction = webpackTask.buildConfig.production;
const webpackConfiguration = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        'eventWriter':  path.join(__dirname, webpackTask.buildConfig.libFolder, 'EventWriterHandler.js')
    },
    output: {
        libraryTarget: 'umd',
        path: path.join(__dirname, webpackTask.buildConfig.distFolder),
        filename: `[name].js`,
        sourceMapFilename: "[name].js.map"
    },
    devtool: "source-map",
    externals: ['aws-sdk'],
    target: 'node'
};
module.exports = webpackConfiguration;