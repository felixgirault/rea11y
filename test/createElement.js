import {forEach} from 'lodash';



/**
 *
 */
export default function createElement(name, attributes = {}) {
	const element = document.createElement(name);

	forEach(attributes, (value, key) =>
		element.setAttribute(key, value)
	);

	return element;
}
