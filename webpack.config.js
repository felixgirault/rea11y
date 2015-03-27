/**
 *
 */
'use strict';

var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');



/**
 *
 */
module.exports = {
	entry: {
		app: './index.js'
	},
	output: {
		library: 'Reaccess',
		libraryTarget: 'umd',
		path: './dist',
		publicPath: '/demo/',
		filename: 'reaccess.js'
	},
	externals: [
		{
			'react': {
				root: 'React',
				commonjs: 'react',
				commonjs2: 'react',
				amd: 'react'
			}
		}
	],
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
				loader: 'babel-loader?experimental&optional=runtime',
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader'
				)
			}
		]
	},
	plugins: [
		new UglifyJsPlugin(),
		new ExtractTextPlugin('reaccess.css', {
			allChunks: true
        })
	]
}
