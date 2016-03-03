/**
 *
 */
import React from 'react';
import {findDOMNode} from 'react-dom';
import {
	Simulate,
	renderIntoDocument,
	findRenderedDOMComponentWithClass as findByClass
} from 'react-addons-test-utils';

import {ESCAPE} from 'offkey';
import KeyHandler from '../../src/utils/KeyHandler';



/**
 *
 */
describe('KeyHandler', function() {

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
