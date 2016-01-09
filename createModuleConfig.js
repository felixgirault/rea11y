/**
 *
 */
'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;



/**
 *
 */
module.exports = function createModuleConfig(module) {
	return {
		entry: {
			js: './src/' + module + '/index.js',
			css: './src/' + module + '/styles.js'
		},
		output: {
			path: './src/' + module + '/dist',
			publicPath: '/src/' + module + '/dist/',
			filename: module + '.[name]'
		},
		resolve: {
			modulesDirectories: [
				'node_modules',
				'src'
			],
		},
		eslint: {
			reporter: require('eslint-friendly-formatter')
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
