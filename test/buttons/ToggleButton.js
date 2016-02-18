/**
 *
 */
import jsdom from 'mocha-jsdom';
import chai from 'chai';
import spies from 'chai-spies';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {Simulate, renderIntoDocument} from 'react-addons-test-utils';
import ToggleButton from '../../src/buttons/ToggleButton';

chai.use(spies);
const expect = chai.expect;



/**
 *
 */
describe('ToggleButton', function() {

	jsdom();

	/**
	 *
	 */
	it('should handle press', function() {
		const handleToggle = chai.spy(() => {});
		const handlePress = chai.spy(() => {});

		const button = renderIntoDocument(
			<ToggleButton
				text="foo"
				pressedText="bar"
				onToggle={handleToggle}
				onPress={handlePress}
			/>
		);

		const node = findDOMNode(button);

		expect(node.getAttribute('aria-pressed')).to.equal('false');
		expect(node.textContent).to.equal('foo');

		Simulate.click(node);

		expect(handleToggle).to.have.been.called.with(true);
		expect(handlePress).to.have.been.called();
	});

	/**
	 *
	 */
	it('should handle release', function() {
		const handleToggle = chai.spy(() => {});
		const handleRelease = chai.spy(() => {});

		const button = renderIntoDocument(
			<ToggleButton
				text="foo"
				pressedText="bar"
				onToggle={handleToggle}
				onRelease={handleRelease}
				pressed
			/>
		);

		const node = findDOMNode(button);

		expect(node.getAttribute('aria-pressed')).to.equal('true');
		expect(node.textContent).to.equal('bar');

		Simulate.click(node);

		expect(handleToggle).to.have.been.called.with(false);
		expect(handleRelease).to.have.been.called();
	});
});
