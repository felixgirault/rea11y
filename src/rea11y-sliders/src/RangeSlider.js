/**
 *
 */
import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import classNames from 'classnames';
import noop from 'no-op';
import offset from 'dom-helpers/query/offset';
import SliderHandle from './SliderHandle';



/**
 *
 */
@pureRender
export default class RangeSlider extends Component {

	/**
	 *
	 */
	static propTypes = {
		orientation: PropTypes.string,
		lowerValue: PropTypes.number,
		upperValue: PropTypes.number,
		onChange: PropTypes.func
	}

	/**
	 *
	 */
	static defaultProps = {
		orientation: 'horizontal',
		lowerValue: 0,
		upperValue: 100,
		onChange: noop
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
	@autoBind
	handleClick(event) {
		const lowerRect = offset(findDOMNode(this.refs.lower));
		const upperRect = offset(findDOMNode(this.refs.upper));

		const lowerDistance = this.distance(lowerRect, event);
		const upperDistance = this.distance(upperRect, event);

		if (lowerDistance < upperDistance) {
			this.refs.lower.handleDrag(event);
		} else {
			this.refs.upper.handleDrag(event);
		}
	}

	/**
	 *
	 */
	@autoBind
	handleLowerChange(value) {
		this.props.onChange(value, this.props.upperValue);
	}

	/**
	 *
	 */
	@autoBind
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
				<div
					ref="track"
					className="rea11y-slider-track"
					onClick={this.handleClick}
				>
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
