/**
 *	@see http://nicolasgallagher.com/how-to-test-react-components-karma-webpack/
 */
module.exports = function(config) {
	config.set({
		files: [
			'karma.bundle.js'
		],
		frameworks: [
			'mocha',
			'chai-spies',
			'chai'
		],
		reporters: [
			'mocha'
		],
		browsers: [
			'Chrome',
			'Firefox'
		],
		preprocessors: {
			'karma.bundle.js': [
				'webpack'
			]
		},
		webpack: {
			devtool: 'inline-source-map',
			module: {
				loaders: [
					{
						loader: 'babel',
						test: /\.js$/,
						exclude: /node_modules/
					}
				]
			}
		},
		webpackMiddleware: {
			noInfo: true
		}
	});
};
