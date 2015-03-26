/**
 *
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import bindMethods from '../utils/bindMethods';



/**
 *
 */
export default class TabLink extends React.Component {

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
		if (this.props.onActive) {
			this.props.onActive(this.props.index);
		}
	}



	/**
	 *
	 */
	handleKeydown(event) {
		switch (event.keyCode) {
			case 37: // left
			case 38: // up
				if (this.props.onPrevious) {
					this.props.onPrevious(this.props.index);
				}
				break;

			case 39: // right
			case 40: // down
				if (this.props.onNext) {
					this.props.onNext(this.props.index);
				}
				break;
		}
	}



	/**
	 *
	 */
	render() {
		const {id, name, active} = this.props;

		const tabLinkId = `${id}-tab-link-${name}`;
		const tabId = `${id}-tab-${name}`;

		const className = classNames({
			'reaccess-tab-link': true,
			'reaccess-tab-link-active': active,
			['reaccess-tab-link-' + name]: true
		});

		return (
			<button
				id={tabLinkId}
				className={className}
				role="tab"
				aria-controls={tabId}
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
TabLink.propTypes = {
	id: React.PropTypes.string,
	name: React.PropTypes.string,
	index: React.PropTypes.number,
	active: React.PropTypes.bool,
	onActive: React.PropTypes.function,
	onPrevious: React.PropTypes.function,
	onNext: React.PropTypes.function
};



/**
 *
 */
TabLink.defaultProps = {
	index: 0,
	active: false,
	onActive: null,
	onPrevious: null,
	onNext: null
};
