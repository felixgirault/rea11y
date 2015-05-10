/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import classNames from 'classnames';
import uid from 'uid';



/**
 *
 */
export default class Panel extends Component {

	/**
	 *
	 */
	render() {
		const {id, name, active} = this.props;

		const panelId = `${id}-panel-${name}`;
		const headerId = `${id}-${name}`;

		const className = classNames({
			'rea11y-panel': true,
			'rea11y-panel-active': active,
			['rea11y-panel-' + name]: true
		});

		return (
			<div
				id={panelId}
				className={className}
				role="tabpanel"
				aria-hidden={!active}
				aria-labelledby={headerId}
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
Panel.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	active: PropTypes.bool
};



/**
 *
 */
Panel.defaultProps = {
	active: false
};
