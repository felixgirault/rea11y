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
import Modal from '../../src/modal/Modal';

chai.use(spies);
const expect = chai.expect;



/**
 *
 */
describe('Modal', function() {

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
		const modal = renderIntoDocument(<Modal/>);
		const node = findByClass(modal, 'rea11y-modal-backdrop');

		expect(node.getAttribute('role')).to.equal('dialog');
		expect(node.getAttribute('tabindex')).to.equal('0');
	});

	/**
	 *
	 */
	it('should be labelled with a text', function() {
		const modal = renderIntoDocument(
			<Modal label="label" />
		);

		const node = findByClass(modal, 'rea11y-modal-backdrop');

		expect(node.getAttribute('aria-label')).to.equal('label');
	});

	/**
	 *
	 */
	it('should be labelled by an element', function() {
		const modal = renderIntoDocument(
			<Modal labelId="title" label="ignored">
				<h1 id="title">Title</h1>
			</Modal>
		);

		const node = findByClass(modal, 'rea11y-modal-backdrop');

		expect(node.getAttribute('aria-labelledby')).to.equal('title');
		expect(node.hasAttribute('aria-label')).to.be.false;
	});

	/**
	 *
	 */
	it('should handle closure', function() {
		const handleClose = chai.spy(() => {});

		const modal = renderIntoDocument(
			<Modal onClose={handleClose} />
		);

		const node = findByClass(modal, 'rea11y-modal-backdrop');

		Simulate.keyDown(node, {
			key: 'Escape',
			keyCode: ESCAPE,
			which: ESCAPE
		});

		expect(handleClose).to.have.been.called();
	});
});
