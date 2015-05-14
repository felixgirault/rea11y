/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import noop from '../utils/noop';
import RangeSlider from './RangeSlider';



/**
 *
 */
@pureRender
export default class StatefulSlider extends Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.state = {
			lowerValue: this.props.defaultLowerValue,
			upperValue: this.props.defaultUpperValue
		};
	}

	/**
	 *
	 */
	@autobind
	handleChange(lower, upper) {
		this.setState({
			lowerValue: lower,
			upperValue: upper
		}, () => {
			this.props.onChange(lower, upper);
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
	onChange: noop
};
