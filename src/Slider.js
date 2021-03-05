import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import classNames from 'classnames';
import noop from './utils/noop';
import {on, off} from 'dom-helpers/events';
import offset from 'dom-helpers/query/offset';
import bound from './utils/bound';
import percentage from './utils/percentage';
import SliderHandle from './SliderHandle';



/**
 *
 */
class Slider extends Component {

	/**
	 *
	 */
	static propTypes = {
		orientation: PropTypes.string,
		min: PropTypes.number,
		max: PropTypes.number,
		step: PropTypes.number,
		bigStep: PropTypes.number,
		values: PropTypes.array.isRequired,
		onChange: PropTypes.func
	};

	/**
	 *
	 */
	static defaultProps = {
		orientation: 'horizontal',
		min: 0,
		max: 100,
		step: 1,
		bigStep: 10,
		values: [0],
		onChange: noop
	};

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.referenceTrack = this.referenceTrack.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
		this.handleDragEnd = this.handleDragEnd.bind(this);

		this.track = null;
		this.handles = [];
	}

	/**
	 *
	 */
	referenceTrack(track) {
		this.track = track;
	}

	/**
	 *
	 */
	referenceHandle(index, handle) {
		this.handles[index] = handle;
	}

	/**
	 *
	 */
	lowerBound(index) {
		const {values, min} = this.props;

		return (index > 0)
			? values[index - 1]
			: min;
	}

	/**
	 *
	 */
	upperBound(index) {
		const {values, max} = this.props;

		return (values.length > index)
			? values[index + 1]
			: max;
	}

	/**
	 *
	 */
	snapped(value) {
		const {step} = this.props;
		return Math.round(value / step) * step;
	}

	/**
	 *
	 */
	distance(index, point) {
		if (!(index in this.handles)) {
			return Infinity;
		}

		const rect = offset(this.handles[index]);

		return (this.props.orientation === 'horizontal')
			? Math.abs(rect.left - point.pageX)
			: Math.abs(rect.top - point.pageY);
	}

	/**
	 *
	 */
	nearestHandle(point) {
		const nearest = this.props.values.reduce((previous, _, index) => {
			const distance = this.distance(index, point);
			return (distance < previous.distance)
				? {distance, index}
				: previous;
		}, {
			distance: Infinity,
			index: 0
		});

		return nearest.index;
	}

	/**
	 *
	 */
	moveTowardsPoint(index, point) {
		if (!this.track) {
			return;
		}

		const {orientation, min, max} = this.props;
		const rect = offset(this.track);
		const ratio = (orientation === 'horizontal')
			? percentage(point.pageX - rect.left, rect.width)
			: percentage(rect.height - (point.pageY - rect.top), rect.height);

		const value = min + (((max - min) / 100) * ratio);
		const snapped = this.snapped(
			bound(
				value,
				this.lowerBound(index),
				this.upperBound(index)
			)
		);

		this.handleChange(index, snapped);
	}

	/**
	 *
	 */
	handleClick(event) {
		const {values} = this.props;
		const index = (values.length > 1)
			? this.nearestHandle(event)
			: 0;

		this.moveTowardsPoint(index, event);
	}

	/**
	 *
	 */
	handleChange(index, newValue) {
		const {values, onChange} = this.props;

		onChange(
			values.map((value, i) => (
				(index === i) ? newValue : value
			))
		);
	}

	/**
	 *
	 */
	handleDragStart(index) {
		this.setState({
			dragging: true,
			dragIndex: index
		}, () => {
			on(document, 'mousemove', this.handleDrag);
			on(document, 'mouseup', this.handleDragEnd);
		});
	}

	/**
	 *
	 */
	handleDrag(event) {
		event.preventDefault();
		this.moveTowardsPoint(this.state.dragIndex, event);
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
	render() {
		const {orientation, values, ...props} = this.props;
		const className = classNames([
			'rea11y-Slider',
			`rea11y-Slider--${orientation}`,
			`rea11y-Slider--${values.length}`
		]);

		return (
			<div className={className}>
				<div
					className="rea11y-Slider-track"
					onClick={this.handleClick}
					ref={this.referenceTrack}
				>
					{values.map((value, index) => (
						<SliderHandle
							{...props}
							key={index}
							orientation={orientation}
							index={index}
							value={value}
							lowerBound={this.lowerBound(index)}
							upperBound={this.upperBound(index)}
							onChange={this.handleChange}
							onDragStart={this.handleDragStart}
							ref={(element) => {
								this.referenceHandle(index, findDOMNode(element));
							}}
						/>
					))}
				</div>
			</div>
		);
	}
}



export default pure(Slider);
