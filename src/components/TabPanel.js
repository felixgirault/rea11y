/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import classNames from 'classnames';



/**
 *
 */
export default class Tab extends Component {

	/**
	 *
	 */
	render() {
		const {id, name, active} = this.props;

		const tabPanelId = `${id}-tab-panel-${name}`;
		const tabId = `${id}-tab-${name}`;

		const className = classNames({
			'rea11y-tab-panel': true,
			'rea11y-tab-panel-active': active,
			['rea11y-tab-panel-' + name]: true
		});

		return (
			<div
				id={tabPanelId}
				className={className}
				href={'#' + tabPanelId}
				role="tabpanel"
				aria-hidden={!active}
				aria-labelledby={tabId}
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
	id: PropTypes.string,
	name: PropTypes.string,
	active: PropTypes.bool
};
