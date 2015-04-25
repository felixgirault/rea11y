/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import classNames from 'classnames';
import SliderTrack from './SliderTrack';
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
				<SliderTrack>
					<SliderHandle {...this.props} />
				</SliderTrack>
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
