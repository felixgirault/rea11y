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
