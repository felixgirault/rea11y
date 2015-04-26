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
	orientation: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	defaultLowerValue: PropTypes.number,
	defaultUpperValue: PropTypes.number,
	step: PropTypes.number,
	bigStep: PropTypes.number,
	text: PropTypes.func,
	onChange: PropTypes.func
};

/**
 *
 */
StatefulSlider.defaultProps = {
	orientation: 'horizontal',
	min: 0,
	max: 100,
	defaultLowerValue: 0,
	defaultUpperValue: 0,
	step: 1,
	bigStep: 10,
	text: null,
	onChange: null
};
