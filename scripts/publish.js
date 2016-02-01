/**
 *
 */
'use strict';

const childProcess = require('child_process');
const forEachModule = require('./forEachModule');
const pkg = require('../package.json');



/**
 *
 */
console.log('Publishing...\n');

forEachModule(function(name, dir) {
	console.log('Module: ' + name + '\n');

	const command = 'npm publish --tag ' + pkg.version;
	const output = childProcess.execSync(command, {
		cwd: dir
	});

	console.log(output + '\n');
});
