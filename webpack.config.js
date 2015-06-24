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
module.exports = {
	entry: {
		js: './index.js',
		css: './styles.js'
	},
	output: {
		library: 'Rea11y',
		libraryTarget: 'umd',
		path: './dist',
		publicPath: '/demo/',
		filename: 'rea11y.[name]'
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
				loader: 'babel-loader?stage=0&optional=runtime',
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
		new UglifyJsPlugin(),
		new ExtractTextPlugin('rea11y.css', {
			allChunks: true
		})
	]
}
