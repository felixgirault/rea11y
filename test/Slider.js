import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import Slider from '../src/Slider';



/**
 *
 */
describe('Slider', function() {

	/**
	 *
	 */
	it('should have appropriate attributes', function() {
		const slider = renderIntoDocument(
			<Slider text="foo" />
		);
	});
});
