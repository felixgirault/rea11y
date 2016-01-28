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
console.log('Building...');

forEachModule(function(name, dir) {
	build(name, function(err, stats) {
		if (err) {
			console.error(' × ' + name);
			console.error(err);
			return;
		}

		console.log(' - ' + name);
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
