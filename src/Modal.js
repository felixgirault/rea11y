import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import {ESCAPE} from 'offkey';
import {bindAll, noop, forEach} from 'lodash';
import offset from 'dom-helpers/query/offset';
import FocusTrap from './FocusTrap';



/**
 *
 */
function makeDefaultStyle(modal, backdrop) {
	const modalRect = offset(modal);
	const backdropRect = offset(backdrop);
	const margin = (backdropRect.height - modalRect.height) / 2;

	return {
		marginTop: `${margin}px`
	};
}



/**
 *
 */
class Modal extends Component {

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
		makeStyle: PropTypes.func,
		onClose: PropTypes.func,
		children: PropTypes.any.isRequired
	};

	/**
	 *
	 */
	static defaultProps = {
		role: 'dialog',
		label: '',
		labelId: '',
		makeStyle: makeDefaultStyle,
		onClose: noop
	};

	/**
	 *
	 */
	constructor(props) {
		super(props);
		bindAll(this, 'handleKeyDown');
	}

	/**
	 *
	 */
	componentDidMount() {
		this.updateStyle();
	}

	/**
	 *
	 */
	componentDidUpdate() {
		this.updateStyle();
	}

	/**
	 *
	 */
	updateStyle() {
		const {modal, backdrop} = this.refs;
		const style = this.props.makeStyle(
			findDOMNode(modal),
			findDOMNode(backdrop)
		);

		forEach(style, (value, property) => {
			modal.style[property] = value;
		});
	}

	/**
	 *
	 */
	handleKeyDown(event) {
		if (event.keyCode === ESCAPE) {
			this.props.onClose();
		}
	}

	/**
	 *
	 */
	render() {
		const {role, label, labelId, children} = this.props;

		const props = {
			role,
			tabIndex: 0,
			ref: 'backdrop',
			className: 'rea11y-Modal-backdrop',
			onKeyDown: this.handleKeyDown
		};

		if (labelId) {
			props['aria-labelledby'] = labelId;
		} else if (label) {
			props['aria-label'] = label;
		}

		return (
			<FocusTrap>
				<div {...props}>
					<div className="rea11y-Modal" ref="modal">
						{children}
					</div>
				</div>
			</FocusTrap>
		);
	}
}



export default pure(Modal);
