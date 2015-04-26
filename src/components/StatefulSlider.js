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
	defaultValue: PropTypes.number,
	onChange: PropTypes.func
};

/**
 *
 */
StatefulSlider.defaultProps = {
	defaultValue: 0,
	onChange: null
};
