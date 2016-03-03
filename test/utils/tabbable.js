/**
 *
 */
import {forEach} from 'lodash';
import createElement from '../createElement';
import tabbable from '../../src/utils/tabbable';



/**
 *
 */
describe('tabbable', function() {

	/**
	 *
	 */
	it('should find tabbable links', function() {
		const linkWithHref = createElement('a', {
			href: 'http://example.com'
		});

		const linkWithHrefAndValidTabIndex = createElement('a', {
			href: 'http://example.com',
			tabindex: 0
		});

		const linkWithHrefAndInvalidTabIndex = createElement('a', {
			href: 'http://example.com',
			tabindex: -1
		});

		const linkWithoutHref = createElement('a');

		const linkWithoutHrefAndValidTabIndex = createElement('a', {
			tabindex: 0
		});

		const linkWithoutHrefAndInvalidTabIndex = createElement('a', {
			tabindex: -1
		});

		const container = createElement('div');

		container.appendChild(linkWithHref);
		container.appendChild(linkWithHrefAndValidTabIndex);
		container.appendChild(linkWithHrefAndInvalidTabIndex);
		container.appendChild(linkWithoutHref);
		container.appendChild(linkWithoutHrefAndValidTabIndex);
		container.appendChild(linkWithoutHrefAndInvalidTabIndex);

		document.body.appendChild(container);

		const elements = tabbable(container);

		expect(elements).to.deep.equal([
			linkWithHref,
			linkWithHrefAndValidTabIndex,
			linkWithoutHrefAndValidTabIndex
		]);
	});

	/**
	 *
	 */
	const elements = [
		'button',
		'input',
		'select',
		'textarea',
		'object',
		'div'
	];

	forEach(elements, (name) => {
		it(`should find tabbable ${name}s`, function() {
			const element = createElement(name, {
				tabindex: 0
			});

			const elementWithInvalidTabIndex = createElement(name, {
				tabindex: -1
			});

			const disabledElement = createElement(name, {
				disabled: 'disabled',
				tabindex: 0
			});

			const container = createElement('div');

			container.appendChild(element);
			container.appendChild(elementWithInvalidTabIndex);
			container.appendChild(disabledElement);

			document.body.appendChild(container);

			const elements = tabbable(container);

			expect(elements).to.deep.equal([
				element
			]);
		});
	})
});
