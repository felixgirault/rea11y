/**
 *
 */
'use strict';

const path = require('path');
const fs = require('fs');



/**
 *
 */
module.exports = function forEachModule(callback) {
	const modulesDir = path.resolve(__dirname, '..', 'src');
	const modules = fs.readdirSync(modulesDir);

	modules.forEach(function(module) {
		const dir = path.resolve(modulesDir, module);
		callback(module, dir);
	});
}
