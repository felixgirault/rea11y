/**
 *
 */
export const atLeast = (value, min) =>
	(value < min) ? min : value;

/**
 *
 */
export const atMost = (value, max) =>
	(value > max) ? max : value;

/**
 *
 */
export default function bound(value, min, max, endless = false) {
	if (value < min) {
		return endless ? max : min;
	}

	if (value > max) {
		return endless ? min : max;
	}

	return value;
}
