/**
 *
 */
'use strict';



/**
 *
 */
export default function percentage(value, max, min = 0) {
	return value
		? ((value * 100) / (max - min))
		: 0;
}
