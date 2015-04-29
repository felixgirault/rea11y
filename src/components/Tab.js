/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import classNames from 'classnames';
import bindMethods from '../utils/bindMethods';
import noop from '../utils/noop';



/**
 *
 */
export default class Tab extends Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		bindMethods(
			this,
			'handleClick',
			'handleKeydown'
		);
	}

	/**
	 *
	 */
	handleClick() {
		this.props.onActive(this.props.index);
	}

	/**
	 *
	 */
	handleKeydown(event) {
		switch (event.keyCode) {
			case 37: // left
			case 38: // up
				this.props.onPrevious(this.props.index);
				break;

			case 39: // right
			case 40: // down
				this.props.onNext(this.props.index);
				break;

			default:
				return;
		}

		event.preventDefault();
	}

	/**
	 *
	 */
	render() {
		const {id, name, active} = this.props;

		const tabId = `${id}-${name}`;
		const panelId = `${id}-panel-${name}`;

		const className = classNames({
			'rea11y-tab': true,
			'rea11y-tab-active': active,
			['rea11y-tab-' + name]: true
		});

		return (
			<button
				id={tabId}
				className={className}
				role="tab"
				aria-controls={panelId}
				aria-selected={active}
				onClick={this.handleClick}
				onKeyDown={this.handleKeydown}
				tabIndex={active ? 0 : -1}
			>
				{this.props.title}
			</button>
		);
	}
}



/**
 *
 */
Tab.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	index: PropTypes.number,
	active: PropTypes.bool,
	onActive: PropTypes.func,
	onFirst: PropTypes.func,
	onLast: PropTypes.func,
	onPrevious: PropTypes.func,
	onNext: PropTypes.func
};

/**
 *
 */
Tab.defaultProps = {
	id: '',
	name: '',
	index: 0,
	active: false,
	onActive: noop,
	onFirst: noop,
	onLast: noop,
	onPrevious: noop,
	onNext: noop
};
