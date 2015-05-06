/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import autobind from 'autobind-decorator';
import noop from '../utils/noop';
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

		this.state = {
			value: this.props.defaultValue
		};
	}

	/**
	 *
	 */
	@autobind
	handleChange(value) {
		this.setState({
			value: value
		}, () => {
			this.props.onChange(value);
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
	onChange: noop
};
