/**
 *
 */
'use strict';



/**
 *
 */
export default function bindMethods(object, ...methods) {
	methods.forEach(method => {
		object[method] = object[method].bind(object);
	});
}
