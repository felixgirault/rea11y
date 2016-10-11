import React, {PropTypes} from 'react';
import {pure} from 'recompose';
import classNames from 'classnames';



/**
 *
 */
const TabPanel = ({id, tabId, name, active = false, children}) => {
	const className = classNames({
		'r1y-TabPanel': true,
		'r1y-TabPanel--active': active,
		[`r1y-TabPanel-${name}`]: true
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

TabPanel.propTypes = {
	id: PropTypes.string,
	tabId: PropTypes.string,
	name: PropTypes.string,
	active: PropTypes.bool,
	children: PropTypes.node.isRequired
};


export default pure(TabPanel);
