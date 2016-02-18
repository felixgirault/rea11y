/**
 *
 */
import jsdom from 'jsdom-global';
import {expect} from 'chai';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import Button from '../../src/buttons/Button';



/**
 *
 */
describe('Button', function() {

	before(function() {
		this.cleanup = jsdom();
	});

	after(function() {
		this.cleanup();
	});

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
