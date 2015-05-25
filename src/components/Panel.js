/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import classNames from 'classnames';



/**
 *
 */
@pureRender
export default class Panel extends Component {

	/**
	 *
	 */
	static propTypes = {
		id: PropTypes.string,
		name: PropTypes.string,
		active: PropTypes.bool
	}

	/**
	 *
	 */
	static defaultProps = {
		active: false
	}

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
