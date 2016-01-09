/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import classNames from 'classnames';
import SliderHandle from './SliderHandle';



/**
 *
 */
@pureRender
export default class Slider extends Component {

	/**
	 *
	 */
	static propTypes = {
		orientation: PropTypes.string
	}

	/**
	 *
	 */
	static defaultProps = {
		orientation: 'horizontal'
	}

	/**
	 *
	 */
	handleClick(event) {
		this.refs.handle.handleDrag(event);
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
				<div
					ref="track"
					className="rea11y-slider-track"
					onClick={::this.handleClick}
				>
					<SliderHandle {...this.props} ref="handle" />
				</div>
			</div>
		);
	}
}
