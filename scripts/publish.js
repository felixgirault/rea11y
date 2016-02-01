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

	const command = 'npm publish --folder ' + dir;
	const output = childProcess.execSync(command);

	console.log(output + '\n');
});
