/**
 *
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import offset from 'dom-helpers/query/offset';
import on from 'dom-helpers/events/on';
import off from 'dom-helpers/events/off';
import bindMethods from '../utils/bindMethods';
import percentage from '../utils/percentage';
import bound from '../utils/bound';



/**
 *
 */
export default class SliderHandle extends React.Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		bindMethods(
			this,
			'handleKeyDown',
			'handleMouseDown',
			'handleDragStart',
			'handleDrag',
			'handleDragEnd'
		);

		this.state = {
			dragging: false,
			percentage: percentage(
				props.value,
				props.max,
				props.min
			)
		};
	}

	/**
	 *
	 */
	componentWillReceiveProps(props) {
		this.setState({
			percentage: percentage(
				props.value,
				props.max,
				props.min
			)
		});
	}

	/**
	 *
	 */
	handleKeyDown(event) {
		let value;

		switch (event.keyCode) {
			case 33: // page up
				value = this.incremented(this.props.bigStep);
				break;

			case 34: // page down
				value = this.incremented(-this.props.bigStep);
				break;

			case 35: // end
				value = this.props.max;
				break;

			case 36: // home
				value = this.props.min;
				break;

			case 37: // left
			case 40: // down
				value = this.incremented(-this.props.step);
				break;

			case 38: // up
			case 39: // right
				value = this.incremented(this.props.step);
				break;

			default:
				return;
		}

		event.preventDefault();
		this.emitChange(value);
	}

	/**
	 *
	 */
	handleMouseDown(event) {
		if (event.button === 0) {
			this.handleDragStart(event);
		}
	}

	/**
	 *
	 */
	handleDragStart(event) {
		this.setState({
			dragging: true,
			dragStartX: event.pageX,
			dragStartY: event.pageY
		}, () => {
			on(document, 'mousemove', this.handleDrag);
			on(document, 'mouseup', this.handleDragEnd);
		});
	}

	/**
	 *
	 */
	handleDrag(event) {
		const node = React.findDOMNode(this);
		const rect = offset(node);

		const per = this.isHorizontal()
			? percentage(event.pageX - rect.left, rect.width)
			: percentage(event.pageY - rect.top, rect.height);

		const max = this.props.max - this.props.min;
		const value = this.props.min + ((max / 100) * per);
		const snapped = this.snapped(value);

		this.emitChange(snapped);
	}

	/**
	 *
	 */
	handleDragEnd() {
		this.setState({
			dragging: false
		}, () => {
			off(document, 'mousemove', this.handleDrag);
			off(document, 'mouseup', this.handleDragEnd);
		});
	}

	/**
	 *
	 */
	isHorizontal() {
		return (this.props.orientation === 'horizontal');
	}

	/**
	 *
	 */
	incremented(step) {
		return bound(
			this.props.value + step,
			this.props.min,
			this.props.max
		);
	}

	/**
	 *
	 */
	snapped(value) {
		const steps = value / this.props.step;

		const lowerStep = Math.floor(steps);
		const fromLowerStep = steps - lowerStep;

		const higherStep = Math.ceil(steps);
		const toHigherStep = higherStep - steps;

		const step = (fromLowerStep < toHigherStep)
			? lowerStep
			: higherStep;

		return bound(
			this.props.step * step,
			this.props.min,
			this.props.max
		);
	}

	/**
	 *
	 */
	emitChange(value) {
		if (this.props.onChange && value !== this.props.value) {
			this.props.onChange(value);
		}
	}

	/**
	 *
	 */
	render() {
		const className = classNames({
			'rea11y-slider-handle': true,
			'rea11y-slider-handle-dragging': this.state.dragging
		});

		return (
			<div className="rea11y-slider-handle-track">
				<div ref="handle" className={className} style={this.style()}>
					<div
						className="rea11y-slider-handle-control"
						role="slider"
						aria-valuemin={this.props.min}
						aria-valuemax={this.props.max}
						aria-valuenow={this.props.value}
						onKeyDown={this.handleKeyDown}
						onMouseDown={this.handleMouseDown}
						tabIndex="0"
					></div>

					<div className="rea11y-slider-handle-text">
						{this.text()}
					</div>
				</div>
			</div>
		);
	}

	/**
	 *
	 */
	text() {
		if (typeof this.props.text !== 'function') {
			return null;
		}

		return this.props.text({
			min: this.props.min,
			max: this.props.max,
			value: this.props.value,
			percentage: this.state.percentage
		});
	}

	/**
	 *
	 */
	style() {
		const property = this.isHorizontal()
			? 'left'
			: 'bottom';

		return {
			[property]: this.state.percentage + '%'
		};
	}
}



/**
 *
 */
SliderHandle.propTypes = {
	orientation: React.PropTypes.string,
	min: React.PropTypes.number,
	max: React.PropTypes.number,
	value: React.PropTypes.number,
	step: React.PropTypes.number,
	bigStep: React.PropTypes.number,
	text: React.PropTypes.func,
	onChange: React.PropTypes.func,
	style: React.PropTypes.object
};

/**
 *
 */
SliderHandle.defaultProps = {
	orientation: 'horizontal',
	min: 0,
	max: 100,
	value: 0,
	step: 1,
	bigStep: 10,
	text: null,
	onChange: null,
	style: {}
};
