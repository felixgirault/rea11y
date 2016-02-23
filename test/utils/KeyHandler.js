/**
 *
 */
import jsdom from 'jsdom-global';
import chai from 'chai';
import spies from 'chai-spies';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {
	Simulate,
	renderIntoDocument,
	findRenderedDOMComponentWithClass as findByClass
} from 'react-addons-test-utils';

import {ESCAPE} from 'offkey';
import KeyHandler from '../../src/utils/KeyHandler';

chai.use(spies);
const expect = chai.expect;



/**
 *
 */
describe('KeyHandler', function() {

	before(function() {
		this.cleanup = jsdom();
	});

	after(function() {
		this.cleanup();
	});

	/**
	 *
	 */
	it('should call key handlers', function() {
		const handleEscape = chai.spy(() => {});

		const handler = renderIntoDocument(
			<KeyHandler
				handlers={{
					[ESCAPE]: handleEscape
				}}
			>
				<div className="node" />
			</KeyHandler>
		);

		const node = findByClass(handler, 'node');

		Simulate.keyDown(node, {
			key: 'Escape',
			keyCode: ESCAPE,
			which: ESCAPE
		});

		expect(handleEscape).to.have.been.called();
	});
});
