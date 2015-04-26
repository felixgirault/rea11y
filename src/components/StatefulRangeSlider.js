/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import bindMethods from '../utils/bindMethods';
import RangeSlider from './RangeSlider';



/**
 *
 */
export default class StatefulSlider extends Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		bindMethods(
			this,
			'handleChange'
		);

		this.state = {
			lowerValue: this.props.defaultLowerValue,
			upperValue: this.props.defaultUpperValue
		};
	}

	/**
	 *
	 */
	handleChange(lower, upper) {
		this.setState({
			lowerValue: lower,
			upperValue: upper
		}, () => {
			if (this.props.onChange) {
				this.props.onChange(lower, upper);
			}
		});
	}

	/**
	 *
	 */
	render() {
		return (
			<RangeSlider
				{...this.props}
				lowerValue={this.state.lowerValue}
				upperValue={this.state.upperValue}
				onChange={this.handleChange}
			/>
		);
	}
}



/**
 *
 */
StatefulSlider.propTypes = {
	defaultLowerValue: PropTypes.number,
	defaultUpperValue: PropTypes.number,
	onChange: PropTypes.func
};

/**
 *
 */
StatefulSlider.defaultProps = {
	defaultLowerValue: 0,
	defaultUpperValue: 0,
	onChange: null
};
