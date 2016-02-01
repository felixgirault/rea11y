/**
 *
 */
'use strict';

const webpack = require('webpack');
const forEachModule = require('./forEachModule');
const createModuleConfig = require('./createModuleConfig');



/**
 *
 */
console.log('Building...\n');

forEachModule(function(name, dir) {
	build(name, function(err, stats) {
		console.log('Module: ' + name + '\n');

		if (err) {
			console.error('  error:' + err);
			return;
		}

		console.log(stats.toString({
			chunks: false
		}));

		console.log('');
	});
});



/**
 *
 */
function build(module, callback) {
	webpack(
		createModuleConfig(module),
		callback
	);
}
