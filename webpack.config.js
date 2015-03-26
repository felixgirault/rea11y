/**
 *
 */
'use strict';



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
		filename: 'reaccess.js'
	},
	externals: [{
		'react': {
			root: 'React',
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'react'
		}
	}],
	module: {
		loaders: [{
			loader: 'babel-loader?experimental&optional=runtime',
			test: /\.js$/,
			exclude: /node_modules/
		}]
	}
}
