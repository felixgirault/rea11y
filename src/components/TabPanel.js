/**
 *
 */
'use strict';

import React from 'react';
import classNames from 'classnames';



/**
 *
 */
export default class Tab extends React.Component {

	/**
	 *
	 */
	render() {
		const {id, name, active} = this.props;

		const tabId = `${id}-tab-${name}`;
		const tabLinkId = `${id}-tab-link-${name}`;

		const className = classNames({
			'rea11y-tab-panel': true,
			'rea11y-tab-panel-active': active,
			['rea11y-tab-panel-' + name]: true
		});

		return (
			<div
				id={tabId}
				className={className}
				href={'#' + tabId}
				role="tabpanel"
				aria-hidden={!active}
				aria-labelledby={tabLinkId}
				tabIndex={active ? 0 : -1}
			>
				{this.props.children}
			</div>
		);
	}
}



/**
 *
 */
Tab.propTypes = {
	id: React.PropTypes.string,
	name: React.PropTypes.string,
	active: React.PropTypes.bool
};
