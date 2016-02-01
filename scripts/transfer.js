/**
 *
 */
'use strict';

const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const pkg = require('../package.json');
const forEachModule = require('./forEachModule');



/**
 *	Transfers dependencies of the main package.json to the
 *	ones in the modules.
 */
console.log('Transferring dependencies...\n');

forEachModule(function(name, dir) {
	console.log('Module: ' + name);

	const sourceDir = path.resolve(dir, 'src');
	const packagePath = path.resolve(dir, 'package.json');
	const newPackage = buildNewPackage(sourceDir, packagePath);

	printDependencies('peer dependencies', newPackage.peerDependencies);
	printDependencies('dependencies', newPackage.dependencies);

	writeNewPackage(packagePath, newPackage);

	console.log('  ok\n');
});



/**
 *
 */
function buildNewPackage(sourceDir, packagePath) {
	const modules = parseImports(sourceDir);

	return _.assign(
		{},
		require(packagePath),
		pick(modules)
	);
}

/**
 *
 */
function writeNewPackage(packagePath, newPackage) {
	fs.writeFileSync(
		packagePath,
		JSON.stringify(newPackage, null, 2) + '\n',
		'utf8'
	);
}

/**
 *
 */
function parseImports(dir) {
	const pattern = /from\s+'([^\.\/][^'\/]+).*'/ig;

	function read(file) {
		const filePath = path.resolve(dir, file);
		return fs.readFileSync(filePath, 'utf8');
	}

	function parse(file) {
		const imports = [];
		let matches;

		while (matches = pattern.exec(file)) {
			imports.push(matches[1]);
		}

		return imports;
	}

	return _(fs.readdirSync(dir))
		.map(read)
		.map(parse)
		.flatten()
		.uniq()
		.value();
}

/**
 *
 */
function pick(modules) {
	function isRea11ymodule(module) {
		return /^rea11y/.test(module);
	}

	const partitioned = _.partition(modules, isRea11ymodule);
	const internals = partitioned[0];
	const externals = partitioned[1];

	function isExternal(version, name) {
		return _.includes(externals, name);
	}

	function aggregate(dependencies, name) {
		return _.set(dependencies, name, pkg.version);
	}

	return {
		peerDependencies: sort(
			_.pick(pkg.devDependencies, isExternal)
		),
		dependencies: sort(
			_.assign(
				_.reduce(internals, aggregate, {}),
				_.pick(pkg.dependencies, isExternal)
			)
		)
	};
}

/**
 *
 */
function sort(dependencies) {
	function aggregate(sorted, name) {
		return _.set(sorted, name, dependencies[name]);
	}

	return _(dependencies)
		.keys()
		.sortByOrder()
		.reduce(aggregate, {});
}

/**
 *
 */
function printDependencies(title, dependencies) {
	if (dependencies) {
		console.log('  ' + title + ':');

		_.keys(dependencies)
			.forEach(function(name) {
				console.log('    - ' + name);
			});

		console.log('');
	}
}
