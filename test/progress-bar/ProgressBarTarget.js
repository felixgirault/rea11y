/**
 *
 */
import jsdom from 'jsdom-global';
import {expect} from 'chai';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {
	renderIntoDocument,
	findRenderedDOMComponentWithClass as findByClass
} from 'react-addons-test-utils';

import ProgressBar from '../../src/progress-bar/ProgressBar';
import ProgressBarTarget from '../../src/progress-bar/ProgressBarTarget';



/**
 *
 */
describe('ProgressBarTarget', function() {

	before(function() {
		this.cleanup = jsdom();

		const target = renderIntoDocument(
			<div id="target" className="target" />
		);

		this.targetNode = findDOMNode(target);

		document.getElementById = (id) => {
			return (this.targetNode.id === id)
				? this.targetNode
				: undefined;
		};
	});

	after(function() {
		this.cleanup();
		this.targetNode = undefined;
	});

	/**
	 *
	 */
	it('should have appropriate attributes', function() {
		const dom = renderIntoDocument(
			<ProgressBar>
				<ProgressBarTarget targetId="target" />
			</ProgressBar>
		);

		const progressBarNode = findByClass(dom, 'rea11y-progress-bar');

		expect(this.targetNode.getAttribute('aria-describedby'))
			.to.equal(progressBarNode.id);

		expect(this.targetNode.getAttribute('aria-busy'))
			.to.equal('false');
	});

	/**
	 *
	 */
	it('should have indicate business', function() {
		const dom = renderIntoDocument(
			<ProgressBar value={12}>
				<ProgressBarTarget targetId="target" />
			</ProgressBar>
		);

		const progressBarNode = findByClass(dom, 'rea11y-progress-bar');

		expect(this.targetNode.getAttribute('aria-busy'))
			.to.equal('true');
	});
});
