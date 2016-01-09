/**
 *
 */
import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import keys from 'offkey';
import noop from 'no-op';
import offset from 'dom-helpers/query/offset';
import {on, off} from 'dom-helpers/events';
import FocusTrap from './FocusTrap';



/**
 *
 */
function center(modal, backdrop) {
	const modalRect = offset(modal);
	const backdropRect = offset(backdrop);
	const margin = (backdropRect.height - modalRect.height) / 2;

	modal.style.marginTop = margin + 'px';
}



/**
 *
 */
@pureRender
export default class Modal extends Component {

	/**
	 *
	 */
	static propTypes = {
		role: PropTypes.oneOf([
			'dialog',
			'alertdialog'
		]),
		label: PropTypes.string,
		labelId: PropTypes.string,
		center: PropTypes.func,
		onClose: PropTypes.func
	}

	/**
	 *
	 */
	static defaultProps = {
		role: 'dialog',
		label: '',
		labelId: '',
		center: center,
		onClose: noop
	}

	/**
	 *
	 */
	componentDidMount() {
		this.center();

		on(document, 'keydown', this.handleKeyDown);
	}

	/**
	 *
	 */
	componentWillUnmount() {
		off(document, 'keydown', this.handleKeyDown);
	}

	/**
	 *
	 */
	componentDidUpdate() {
		this.center();
	}

	/**
	 *	Calls a custom function to center the modal on the page.
	 */
	center() {
		this.props.center(
			findDOMNode(this.refs.modal),
			findDOMNode(this.refs.backdrop)
		);
	}

	/**
	 *
	 */
	@autobind
	handleKeyDown(event) {
		if (event.keyCode === keys.ESCAPE) {
			this.props.onClose();
		}
	}

	/**
	 *
	 */
	render() {
		let props = {
			ref: 'backdrop',
			className: 'rea11y-modal-backdrop',
			role: this.props.role,
			tabIndex: 0
		};

		if (this.props.labelId) {
			props['aria-labelledby'] = this.props.labelId;
		} else if (this.props.label) {
			props['aria-label'] = this.props.label;
		}

		return (
			<FocusTrap>
				<div {...props}>
					<div className="rea11y-modal" ref="modal">
						{this.props.children}
					</div>
				</div>
			</FocusTrap>
		);
	}
}
