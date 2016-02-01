/**
 *
 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
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
			js: fullPath('modules', module, 'index.js'),
			css: fullPath('modules', module, 'css', 'styles.css')
		},
		output: {
			path: fullPath('modules', module, 'dist'),
			publicPath: '/modules/' + module + '/dist/',
			filename: module + '.js'
		},
		externals: /^[a-z\-0-9\/]+$/,
		resolve: {
			modulesDirectories: [
				fullPath('node_modules'),
				fullPath('modules')
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
						'css-loader!postcss-loader'
					)
				}
			]
		},
		postcss: function() {
			return [autoprefixer];
		},
		plugins: [
			//new UglifyJsPlugin(),
			new ExtractTextPlugin(module + '.css', {
				allChunks: true
			})
		]
	};
}
