/**
 *
 */
import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import Button from '../../src/buttons/Button';



/**
 *
 */
describe('Button', function() {

	/**
	 *
	 */
	it('should have appropriate attributes', function() {
		const button = renderIntoDocument(
			<div>
				<Button text="foo" />
			</div>
		);

		const node = findDOMNode(button).children[0];

		expect(node.getAttribute('role')).to.equal('button');
		expect(node.textContent).to.equal('foo');
	});
});
