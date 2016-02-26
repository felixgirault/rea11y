/**
 *
 */
import jsdom from 'jsdom-global';
import chai from 'chai';
import spies from 'chai-spies';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {Simulate, renderIntoDocument} from 'react-addons-test-utils';
import {HOME, END, ARROW} from 'offkey';
import Tab from '../../src/tabs/Tab';

chai.use(spies);
const expect = chai.expect;



/**
 *
 */
describe('Tab', function() {

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
		const tab = renderIntoDocument(
			<Tab
				id="id"
				panelId="panel-id"
				name="name"
				title="Title"
			/>
		);

		const node = findDOMNode(tab);

		expect(node.getAttribute('id')).to.equal('id');
		expect(node.getAttribute('role')).to.equal('tab');
		expect(node.getAttribute('aria-controls')).to.equal('panel-id');
		expect(node.getAttribute('aria-selected')).to.equal('false');
		expect(node.getAttribute('tabindex')).to.equal('-1');
		expect(node.className).to.contain('rea11y-tab');
		expect(node.className).to.contain('rea11y-tab-name');
		expect(node.className).to.not.contain('rea11y-tab-active');
		expect(node.textContent).to.equal('Title');
	});

	/**
	 *
	 */
	it('should have appropriate attributes when active', function() {
		const tab = renderIntoDocument(
			<Tab 
				id="id"
				panelId="panel-id"
				name="name"
				title="Title"
				active
			/>
		);

		const node = findDOMNode(tab);

		expect(node.getAttribute('aria-selected')).to.equal('true');
		expect(node.getAttribute('tabindex')).to.equal('0');
		expect(node.className).to.contain('rea11y-tab-active');
	});

	/**
	 *
	 */
	it('should call onActive when clicked', function() {
		const handleActive = chai.spy(() => {});
		const tab = renderIntoDocument(
			<Tab
				id="id"
				panelId="panel-id"
				name="name"
				title="Title"
				onActive={handleActive}
			/>
		);

		const node = findDOMNode(tab);

		Simulate.click(node);

		expect(handleActive).to.have.been.called();
	});

	/**
	 *
	 */
	it('should call onFirst when pressing HOME', function() {
		const handleFirst = chai.spy(() => {});
		const tab = renderIntoDocument(
			<Tab
				id="id"
				panelId="panel-id"
				name="name"
				title="Title"
				onFirst={handleFirst}
			/>
		);

		const node = findDOMNode(tab);

		Simulate.keyDown(node, {
			keyCode: HOME,
			which: HOME
		});

		expect(handleFirst).to.have.been.called();
	});

	/**
	 *
	 */
	it('should call onLast when pressing END', function() {
		const handleLast = chai.spy(() => {});
		const tab = renderIntoDocument(
			<Tab
				id="id"
				panelId="panel-id"
				name="name"
				title="Title"
				onLast={handleLast}
			/>
		);

		const node = findDOMNode(tab);

		Simulate.keyDown(node, {
			keyCode: END,
			which: END
		});

		expect(handleLast).to.have.been.called();
	});

	/**
	 *
	 */
	it('should call onPrevious when pressing LEFT or UP', function() {
		const handlePrevious = chai.spy(() => {});
		const tab = renderIntoDocument(
			<Tab
				id="id"
				panelId="panel-id"
				name="name"
				title="Title"
				onPrevious={handlePrevious}
			/>
		);

		const node = findDOMNode(tab);

		Simulate.keyDown(node, {
			keyCode: ARROW.LEFT,
			which: ARROW.LEFT
		});

		Simulate.keyDown(node, {
			keyCode: ARROW.UP,
			which: ARROW.UP
		});

		expect(handlePrevious).to.have.been.called.twice();
	});

	/**
	 *
	 */
	it('should call onNext when pressing RIGHT or DOWN', function() {
		const handleNext = chai.spy(() => {});
		const tab = renderIntoDocument(
			<Tab
				id="id"
				panelId="panel-id"
				name="name"
				title="Title"
				onNext={handleNext}
			/>
		);

		const node = findDOMNode(tab);

		Simulate.keyDown(node, {
			keyCode: ARROW.RIGHT,
			which: ARROW.RIGHT
		});

		Simulate.keyDown(node, {
			keyCode: ARROW.DOWN,
			which: ARROW.DOWN
		});

		expect(handleNext).to.have.been.called.twice();
	});
});
