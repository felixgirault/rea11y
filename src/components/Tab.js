/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import autobind from 'autobind-decorator';
import classNames from 'classnames';
import KeyCodes from '../utils/KeyCodes';
import noop from '../utils/noop';



/**
 *
 */
export default class Tab extends Component {

	/**
	 *
	 */
	@autobind
	handleClick() {
		this.props.onActive(this.props.name);
	}

	/**
	 *
	 */
	@autobind
	handleKeydown(event) {
		switch (event.keyCode) {
			case KeyCodes.END:
				this.props.onLast();
				break;

			case KeyCodes.HOME:
				this.props.onFirst();
				break;

			case KeyCodes.LEFT:
			case KeyCodes.UP:
				this.props.onPrevious(this.props.name);
				break;

			case KeyCodes.RIGHT:
			case KeyCodes.DOWN:
				this.props.onNext(this.props.name);
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
	active: false,
	onActive: noop,
	onFirst: noop,
	onLast: noop,
	onPrevious: noop,
	onNext: noop
};
