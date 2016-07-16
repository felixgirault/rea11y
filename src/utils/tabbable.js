import {filter} from 'lodash';



/**
 *
 */
const SELECTOR = `
	a,
	button,
	input,
	select,
	textarea,
	object,
	[tabindex]
`;



/**
 *	Tells if the given link element is tabbable, i.e if it
 *	has an href attribute or a valid tab index.
 *
 *	@param DOMElement link Link.
 *	@return boolean If the link is tabbable.
 */
function isTabbableLink(link) {
	const hasHref = !!link.getAttribute('href');
	const tabIndex = parseInt(link.getAttribute('tabindex'), 10);
	const hasTabIndex = !isNaN(tabIndex);

	return hasHref
		? (!hasTabIndex || tabIndex >= 0)
		: (hasTabIndex && tabIndex >= 0);
}

/**
 *	Tells if the given element is tabbable, i.e if it is not
 *	disabled and has a valid tab index.
 *
 *	@param DOMElement link Link.
 *	@return boolean If the link is tabbable.
 */
function isTabbableElement(element) {
	if (element.getAttribute('disabled')) {
		return false;
	}

	const tabIndex = element.getAttribute('tabindex');

	if (!tabIndex) {
		return true;
	}

	return tabIndex >= 0;
}

/**
 *
 */
function isLink(element) {
	return (
		element.tagName === 'a'
		|| element.tagName === 'A'
	);
}

/**
 *
 */
function isTabbable(element) {
	return isLink(element)
		? isTabbableLink(element)
		: isTabbableElement(element);
}

/**
 *	Returns all tabbable elements inside the given container.
 *
 *	@param DOMElement container Container.
 *	@return Array Tabbable elements.
 */
export default function tabbable(container = document) {
	const elements = container.querySelectorAll(SELECTOR);
	return filter(elements, isTabbable);
}
