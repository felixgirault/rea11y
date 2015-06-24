/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import classNames from 'classnames';
import keys from 'offkey';
import noop from 'no-op';



/**
 *
 */
@pureRender
export default class Tab extends Component {

	/**
	 *
	 */
	static propTypes = {
		id: PropTypes.string,
		name: PropTypes.string,
		active: PropTypes.bool,
		onActive: PropTypes.func,
		onFirst: PropTypes.func,
		onLast: PropTypes.func,
		onPrevious: PropTypes.func,
		onNext: PropTypes.func
	}

	/**
	 *
	 */
	static defaultProps = {
		active: false,
		onActive: noop,
		onFirst: noop,
		onLast: noop,
		onPrevious: noop,
		onNext: noop
	}

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
	handleKeyDown(event) {
		switch (event.keyCode) {
			case keys.END:
				this.props.onLast();
				break;

			case keys.HOME:
				this.props.onFirst();
				break;

			case keys.ARROW.LEFT:
			case keys.ARROW.UP:
				this.props.onPrevious(this.props.name);
				break;

			case keys.ARROW.RIGHT:
			case keys.ARROW.DOWN:
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
				onKeyDown={this.handleKeyDown}
				tabIndex={active ? 0 : -1}
			>
				{this.props.title}
			</button>
		);
	}
}
