/**
 *
 */
export default function percentage(value, max, min = 0) {
	if (value <= min) {
		return 0;
	}

	if (value >= max) {
		return 100;
	}

	return ((value - min) * 100) / (max - min);
}
