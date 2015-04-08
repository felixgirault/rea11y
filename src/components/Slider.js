/**
 *
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import SliderHandle from './SliderHandle';



/**
 *
 */
export default class Slider extends React.Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);
	}

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
	orientation: React.PropTypes.string,
	min: React.PropTypes.number,
	max: React.PropTypes.number,
	value: React.PropTypes.number,
	step: React.PropTypes.number,
	bigStep: React.PropTypes.number,
	text: React.PropTypes.func,
	onChange: React.PropTypes.func
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
