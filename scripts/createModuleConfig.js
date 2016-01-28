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
const fullPath = partial(path.resolve, __dirname, '..');



/**
 *
 */
module.exports = function createModuleConfig(module) {
	return {
		entry: {
			js: fullPath('src', module, 'index.js'),
			css: fullPath('src', module, 'css', 'styles.css')
		},
		output: {
			path: fullPath('src', module, 'dist'),
			publicPath: '/src/' + module + '/dist/',
			filename: module + '.js'
		},
		externals: /^[a-z\-0-9]+$/,
		resolve: {
			modulesDirectories: [
				fullPath('node_modules'),
				fullPath('src')
			],
		},
		eslint: {
			reporter: reporter
		},
		module: {
			preLoaders: [
				{
					loader: 'eslint-loader',
					test: /\.js$/,
					exclude: /node_modules/
				}
			],
			loaders: [
				{
					loader: 'babel-loader',
					test: /\.js$/,
					exclude: /node_modules/
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
			//new UglifyJsPlugin(),
			new ExtractTextPlugin(module + '.css', {
				allChunks: true
			})
		]
	};
}
