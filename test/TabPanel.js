import jsdom from 'jsdom-global';
import {expect} from 'chai';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-dom/test-utils';
import TabPanel from '../src/TabPanel';



/**
 *
 */
describe('TabPanel', function() {

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
		const panel = renderIntoDocument(
			<div>
				<TabPanel
					id="id"
					tabId="tab-id"
					name="name"
				/>
			</div>
		);

		const node = findDOMNode(panel).children[0];

		expect(node.getAttribute('id')).to.equal('id');
		expect(node.getAttribute('role')).to.equal('tabpanel');
		expect(node.getAttribute('aria-hidden')).to.equal('true');
		expect(node.getAttribute('aria-labelledby')).to.equal('tab-id');
		expect(node.getAttribute('tabindex')).to.equal('-1');
		expect(node.className).to.contain('rea11y-TabPanel');
		expect(node.className).to.contain('rea11y-TabPanel-name');
		expect(node.className).to.not.contain('rea11y-TabPanel--active');
	});

	/**
	 *
	 */
	it('should have appropriate attributes when active', function() {
		const panel = renderIntoDocument(
			<div>
				<TabPanel id="id" name="name" active />
			</div>
		);

		const node = findDOMNode(panel).children[0];

		expect(node.getAttribute('aria-hidden')).to.equal('false');
		expect(node.getAttribute('tabindex')).to.equal('0');
		expect(node.className).to.contain('rea11y-TabPanel--active');
	});
});
