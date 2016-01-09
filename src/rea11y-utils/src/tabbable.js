/**
 *
 */
const ELEMENTS_QUERY = '*[tabindex], button, input, object, select, textarea';



/**
 *	Returns all tabbable elements inside the given container.
 *
 *	@param DOMElement container Container.
 *	@return Array Tabbable elements.
 */
export default function tabbable(container = document) {
	const links = container
		.getElementsByTagName('a')
		.filter(isTabbableLink);

	const elements = container
		.querySelectorAll(ELEMENTS_QUERY)
		.filter(isTabbableElement);

	return links.concat(elements);
}

/**
 *	Tells if the given link element is tabbable, i.e if it
 *	has an href attribute or a valid tab index.
 *
 *	@param DOMElement link Link.
 *	@return boolean If the link is tabbable.
 */
function isTabbableLink(link) {
	const hasHref = !!link.getAttribute('href');
	const tabIndex = link.getAttribute('tabindex');
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
	if (element.disabled) {
		return false;
	}

	const tabIndex = element.getAttribute('tabindex');

	if (!tabIndex) {
		return true;
	}

	return tabIndex >= 0;
}
