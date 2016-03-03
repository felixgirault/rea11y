import React, {Component} from 'react';



/**
 *	A dummy component that can be queried with React test
 *	utilities (simple <div>s can't).
 */
export default class Dummy extends Component {

	/**
	 *
	 */
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}
