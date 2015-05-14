/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import noop from '../utils/noop';
import Tabs from './Tabs';



/**
 *
 */
@pureRender
export default class StatefulTabs extends Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.state = {
			active: this.props.defaultActive
		};
	}

	/**
	 *
	 */
	@autobind
	handleActive(name) {
		this.setState({
			active: name
		}, () => {
			this.props.onActive(name);
		});
	}

	/**
	 *
	 */
	render() {
		return (
			<Tabs
				{...this.props}
				active={this.state.active}
				onActive={this.handleActive}
			>
				{this.props.children}
			</Tabs>
		);
	}
}



/**
 *
 */
StatefulTabs.propTypes = {
	defaultActive: PropTypes.string,
	onActive: PropTypes.func
};

/**
 *
 */
StatefulTabs.defaultProps = {
	onActive: noop
};
