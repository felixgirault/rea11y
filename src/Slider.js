import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import {bindAll} from 'lodash';
import classNames from 'classnames';
import {noop} from 'lodash';
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
		bindAll(
			this,
			'handleClick',
			'handleChange',
			'handleDragStart',
			'handleDrag',
			'handleDragEnd'
		);
	}

	/**
	 *
	 */
	handleRef(index) {
		return `handle-${index}`;
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
		const handle = this.refs[this.handleRef(index)];
		const rect = offset(findDOMNode(handle));

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
		const {orientation, min, max} = this.props;
		const rect = offset(findDOMNode(this.refs.track));
		const ratio = (orientation === 'horizontal')
			? percentage(point.pageX - rect.left, rect.width)
			: percentage(point.pageY - rect.top, rect.height);

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
					ref="track"
					className="rea11y-Slider-track"
					onClick={this.handleClick}
				>
					{values.map((value, index) => (
						<SliderHandle
							{...props}
							ref={this.handleRef(index)}
							key={index}
							index={index}
							value={value}
							lowerBound={this.lowerBound(index)}
							upperBound={this.upperBound(index)}
							onChange={this.handleChange}
							onDragStart={this.handleDragStart}
						/>
					))}
				</div>
			</div>
		);
	}
}



export default pure(Slider);
