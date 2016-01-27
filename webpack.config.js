/**
 *
 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const reporter = require('eslint-friendly-formatter');
const partial = require('lodash/function/partial');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const fullPath = partial(path.resolve, __dirname);



/**
 *
 */
module.exports = {
	entry: './index.js',
	output: {
		path: './dist',
		publicPath: '/dist/',
		filename: 'demo.js'
	},
	resolve: {
		modulesDirectories: [
			fullPath('node_modules'),
			fullPath('src')
		]
	},
	eslint: {
		reporter: reporter
	},
	module: {
		preLoaders: [
			{
				loader: 'eslint-loader',
				test: /\.js$/,
				exclude: fullPath('node_modules')
			}
		],
		loaders: [
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: fullPath('node_modules')
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader!autoprefixer-loader'
				)
			}
		]
	},
	plugins: [
		new UglifyJsPlugin(),
		new ExtractTextPlugin('demo.css', {
			allChunks: true
		})
	]
}
