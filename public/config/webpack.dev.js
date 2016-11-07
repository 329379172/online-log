/**
 * Created by linfeiyang on 16-10-27.
 */
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
/*var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');*/
//var dashboard = new Dashboard();

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://10.10.1.145:8000/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),

        //new DashboardPlugin(dashboard.setData)
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        quiet: false,
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        }
    }
});