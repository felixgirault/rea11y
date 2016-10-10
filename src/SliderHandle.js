import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {pure} from 'recompose';
import classNames from 'classnames';
import {ARROW, PAGE_UP, PAGE_DOWN, HOME, END} from 'offkey';
import {bindAll, noop} from 'lodash';
import {on, off} from 'dom-helpers/events';
import offset from 'dom-helpers/query/offset';
import bound from './utils/bound';
import percentage from './utils/percentage';
import KeyHandler from './KeyHandler';



/**
 *
 */
function makeDefaultText({value}) {
	return value;
}

/**
 *
 */
function makeDefaultStyle({min, max, value, orientation}) {
	const position = percentage(value, max, min);
	const property = (orientation === 'horizontal')
		? 'left'
		: 'bottom';

	return {
		[property]: `${position}%`
	};
}



/**
 *
 */
class SliderHandle extends Component {

	/**
	 *
	 */
	static propTypes = {
		orientation: PropTypes.string,
		min: PropTypes.number,
		max: PropTypes.number,
		lowerBound: PropTypes.number,
		upperBound: PropTypes.number,
		value: PropTypes.number,
		step: PropTypes.number,
		bigStep: PropTypes.number,
		makeText: PropTypes.func,
		makeStyle: PropTypes.func,
		registerTrackEventListener: PropTypes.func,
		onChange: PropTypes.func
	};

	/**
	 *
	 */
	static defaultProps = {
		orientation: 'horizontal',
		min: 0,
		max: 100,
		lowerBound: 0,
		upperBound: 0,
		value: 0,
		step: 1,
		bigStep: 10,
		makeText: makeDefaultText,
		makeStyle: makeDefaultStyle,
		registerTrackEventListener: noop,
		onChange: noop
	};

	/**
	 *
	 */
	constructor(props) {
		super(props);
		bindAll(
			this,
			'handleTrackEvent',
			'handleMouseDown',
			'handleDragStart',
			'handleDrag',
			'handleDragEnd',
			'handleMin',
			'handleMax',
			'handleIncrement',
			'handleBigIncrement',
			'handleDecrement',
			'handleBigDecrement'
		);

		this.state = {
			dragging: false
		};

		props.registerTrackEventListener(this.handleTrackEvent);
	}

	/**
	 *
	 */
	parentOffset() {
		const parent = findDOMNode(this).parentElement;
		return offset(parent);
	}

	/**
	 *
	 */
	snapped(value) {
		const steps = value / this.props.step;
		return Math.round(steps) * this.props.step;
	}

	/**
	 *
	 */
	bound(value) {
		return bound(
			value,
			this.props.lowerBound || this.props.min,
			this.props.upperBound || this.props.max
		);
	}

	/**
	 *
	 */
	emitChange(newValue) {
		const {value, onChange} = this.props;
		const boundValue = this.bound(newValue);

		if (value !== boundValue) {
			onChange(boundValue);
		}
	}

	/**
	 *
	 */
	handleTrackEvent(event) {
		this.handleDrag(event);
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
		event.preventDefault();

		const {min, max, orientation} = this.props;

		const rect = this.parentOffset();
		const ratio = (orientation === 'horizontal')
			? percentage(event.pageX - rect.left, rect.width)
			: percentage(event.pageY - rect.top, rect.height);

		const value = min + (((max - min) / 100) * ratio);
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
	handleMin() {
		this.emitChange(this.props.min);
	}

	/**
	 *
	 */
	handleMax() {
		this.emitChange(this.props.max);
	}

	/**
	 *
	 */
	handleIncrement() {
		const {value, step} = this.props;
		this.emitChange(value + step);
	}

	/**
	 *
	 */
	handleBigIncrement() {
		const {value, bigStep} = this.props;
		this.emitChange(value + bigStep);
	}

	/**
	 *
	 */
	handleDecrement() {
		const {value, step} = this.props;
		this.emitChange(value - step);
	}

	/**
	 *
	 */
	handleBigDecrement() {
		const {value, bigStep} = this.props;
		this.emitChange(value - bigStep);
	}

	/**
	 *
	 */
	render() {
		const {min, max, value, makeText, makeStyle} = this.props;

		const text = makeText(this.props);
		const style = makeStyle(this.props);

		const className = classNames({
			'r1y-SliderHandle': true,
			'is-dragging': this.state.dragging
		});

		return (
			<div className={className} style={style}>
				<KeyHandler
					handlers={{
						[HOME]: this.handleMin,
						[END]: this.handleMax,
						[ARROW.UP]: this.handleIncrement,
						[ARROW.RIGHT]: this.handleIncrement,
						[PAGE_UP]: this.handleBigIncrement,
						[ARROW.DOWN]: this.handleDecrement,
						[ARROW.LEFT]: this.handleDecrement,
						[PAGE_DOWN]: this.handleBigDecrement
					}}
				>
					<div
						className="r1y-SliderHandle-control"
						role="slider"
						aria-valuemin={min}
						aria-valuemax={max}
						aria-valuenow={value}
						onMouseDown={this.handleMouseDown}
						tabIndex="0"
					></div>
				</KeyHandler>

				<div className="r1y-SliderHandle-text">
					{text}
				</div>
			</div>
		);
	}
}



export default pure(SliderHandle);
