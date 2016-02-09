/**
 *
 */
export default function sortObject(object, order) {
	const sorted = {};

	order.forEach((key) => {
		if (key in object) {
			sorted[key] = object[key];
		}
	});

	return sorted;
}
