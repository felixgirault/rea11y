/**
 *
 */
'use strict';



/**
 *
 */
module.exports = {
	output: {
		library: 'Reaccess',
		libraryTarget: 'umd'
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
