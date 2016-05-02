/**
 *
 */
import React, {PropTypes} from 'react';
import classNames from 'classnames';



/**
 *
 */
export default function TabPanel({id, tabId, name, active = false, children}) {
	const className = classNames({
		'rea11y-panel': true,
		'rea11y-panel-active': active,
		[`rea11y-panel-${name}`]: true
	});

	return (
		<div
			id={id}
			className={className}
			role="tabpanel"
			aria-hidden={!active}
			aria-labelledby={tabId}
			tabIndex={active ? 0 : -1}
		>
			{children}
		</div>
	);
}

/**
 *
 */
TabPanel.propTypes = {
	id: PropTypes.string,
	tabId: PropTypes.string,
	name: PropTypes.string,
	active: PropTypes.bool,
	children: PropTypes.node.isRequired
};
