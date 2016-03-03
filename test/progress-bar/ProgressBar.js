/**
 *
 */
import jsdom from 'jsdom-global';
import {expect} from 'chai';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import ProgressBar from '../../src/progress-bar/ProgressBar';



/**
 *
 */
describe('ProgressBar', function() {

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
		const progressBar = renderIntoDocument(
			<ProgressBar
				min={10}
				max={90}
				value={50}
			/>
		);

		const node = findDOMNode(progressBar);

		expect(node.getAttribute('role')).to.equal('progressbar');
		expect(node.getAttribute('aria-valuemin')).to.equal('10');
		expect(node.getAttribute('aria-valuemax')).to.equal('90');
		expect(node.getAttribute('aria-valuenow')).to.equal('50');
		expect(node.getAttribute('aria-valuetext')).to.equal('50%');
		expect(node.textContent).to.equal('50%');
	});
});