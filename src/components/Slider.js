/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import classNames from 'classnames';
import SliderHandle from './SliderHandle';



/**
 *
 */
export default class Slider extends Component {

	/**
	 *
	 */
	render() {
		const className = classNames([
			'rea11y-slider',
			'rea11y-slider-' + this.props.orientation
		]);

		return (
			<div className={className}>
				<SliderHandle
					orientation={this.props.orientation}
					min={this.props.min}
					max={this.props.max}
					value={this.props.value}
					step={this.props.step}
					bigStep={this.props.bigStep}
					text={this.props.text}
					onChange={this.props.onChange}
				/>
			</div>
		);
	}
}



/**
 *
 */
Slider.propTypes = {
	orientation: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	value: PropTypes.number,
	step: PropTypes.number,
	bigStep: PropTypes.number,
	text: PropTypes.func,
	onChange: PropTypes.func
};

/**
 *
 */
Slider.defaultProps = {
	orientation: 'horizontal',
	min: 0,
	max: 100,
	value: 0,
	step: 1,
	bigStep: 10,
	text: null,
	onChange: null
};
