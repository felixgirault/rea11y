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
	orientation: PropTypes.string
};

/**
 *
 */
Slider.defaultProps = {
	orientation: 'horizontal'
};
