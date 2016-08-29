import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {pure} from 'recompose';
import classNames from 'classnames';
import {bindAll, noop} from 'lodash';
import offset from 'dom-helpers/query/offset';
import SliderHandle from './SliderHandle';



/**
 *
 */
class RangeSlider extends Component {

	/**
	 *
	 */
	static propTypes = {
		orientation: PropTypes.string,
		lowerValue: PropTypes.number,
		upperValue: PropTypes.number,
		onChange: PropTypes.func
	};

	/**
	 *
	 */
	static defaultProps = {
		orientation: 'horizontal',
		lowerValue: 0,
		upperValue: 100,
		onChange: noop
	};

	/**
	 *
	 */
	constructor(props) {
		super(props);
		bindAll(
			this,
			'setLowerTrackEventListener',
			'setUpperTrackEventListener',
			'handleClick',
			'handleLowerChange',
			'handleUpperChange'
		);

		this.lowerTrackEventListener = noop;
		this.upperTrackEventListener = noop;
	}

	/**
	 *
	 */
	distance(rect, event) {
		return (this.props.orientation === 'horizontal')
			? Math.abs(rect.left - event.pageX)
			: Math.abs(rect.top - event.pageY);
	}

	/**
	 *
	 */
	setLowerTrackEventListener(listener) {
		this.lowerTrackEventListener = listener;
	}

	/**
	 *
	 */
	setUpperTrackEventListener(listener) {
		this.upperTrackEventListener = listener;
	}

	/**
	 *
	 */
	handleClick(event) {
		const {lower, upper} = this.refs;

		const lowerRect = offset(findDOMNode(lower));
		const upperRect = offset(findDOMNode(upper));

		const lowerDistance = this.distance(lowerRect, event);
		const upperDistance = this.distance(upperRect, event);

		if (lowerDistance < upperDistance) {
			this.lowerTrackEventListener(event);
		} else {
			this.upperTrackEventListener(event);
		}
	}

	/**
	 *
	 */
	handleLowerChange(value) {
		const {onChange, upperValue} = this.props;
		onChange(value, upperValue);
	}

	/**
	 *
	 */
	handleUpperChange(value) {
		const {onChange, lowerValue} = this.props;
		onChange(lowerValue, value);
	}

	/**
	 *
	 */
	render() {
		const className = classNames([
			'r1y-RangeSlider',
			'r1y-Slider',
			`r1y-Slider--${this.props.orientation}`
		]);

		return (
			<div className={className}>
				<div
					ref="track"
					className="r1y-Slider-track"
					onClick={this.handleClick}
				>
					<SliderHandle
						{...this.props}
						ref="lower"
						value={this.props.lowerValue}
						onChange={this.handleLowerChange}
						upperBound={this.props.upperValue}
						registerTrackEventListener={this.setLowerTrackEventListener}
					/>

					<SliderHandle
						{...this.props}
						ref="upper"
						value={this.props.upperValue}
						onChange={this.handleUpperChange}
						lowerBound={this.props.lowerValue}
						registerTrackEventListener={this.setUpperTrackEventListener}
					/>
				</div>
			</div>
		);
	}
}



export default pure(RangeSlider);
