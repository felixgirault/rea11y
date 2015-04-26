/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import bindMethods from '../utils/bindMethods';
import Slider from './Slider';



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
			value: this.props.defaultValue
		};
	}

	/**
	 *
	 */
	handleChange(value) {
		this.setState({
			value: value
		}, () => {
			if (this.props.onChange) {
				this.props.onChange(value);
			}
		});
	}

	/**
	 *
	 */
	render() {
		return (
			<Slider
				{...this.props}
				value={this.state.value}
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
	defaultValue: PropTypes.number,
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
	defaultValue: 0,
	step: 1,
	bigStep: 10,
	text: null,
	onChange: null
};
