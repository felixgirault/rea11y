/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import classNames from 'classnames';
import bindMethods from '../utils/bindMethods';
import noop from '../utils/noop';
import SliderHandle from './SliderHandle';



/**
 *
 */
export default class RangeSlider extends Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		bindMethods(
			this,
			'handleLowerChange',
			'handleUpperChange'
		);
	}

	/**
	 *
	 */
	handleLowerChange(value) {
		this.props.onChange(value, this.props.upperValue);
	}

	/**
	 *
	 */
	handleUpperChange(value) {
		this.props.onChange(this.props.lowerValue, value);
	}

	/**
	 *
	 */
	render() {
		const className = classNames([
			'rea11y-slider',
			'rea11y-slider-range',
			'rea11y-slider-' + this.props.orientation
		]);

		return (
			<div className={className}>
				<div className="rea11y-slider-track">
					<SliderHandle
						{...this.props}
						ref="lower"
						value={this.props.lowerValue}
						onChange={this.handleLowerChange}
						upperBound={this.props.upperValue}
						offset={this.offset}
					/>

					<SliderHandle
						{...this.props}
						ref="upper"
						value={this.props.upperValue}
						onChange={this.handleUpperChange}
						lowerBound={this.props.lowerValue}
						offset={this.offset}
					/>
				</div>
			</div>
		);
	}
}



/**
 *
 */
RangeSlider.propTypes = {
	orientation: PropTypes.string,
	lowerValue: PropTypes.number,
	upperValue: PropTypes.number,
	onChange: PropTypes.func
};

/**
 *
 */
RangeSlider.defaultProps = {
	orientation: 'horizontal',
	lowerValue: 0,
	upperValue: 100,
	onChange: noop
};
