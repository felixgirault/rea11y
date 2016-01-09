/**
 *
 */
import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import classNames from 'classnames';
import keys from 'offkey';
import noop from 'no-op';
import {on, off} from 'dom-helpers/events';
import offset from 'dom-helpers/query/offset';
import {KeyHandler, bound, percentage} from 'rea11y-utils';



/**
 *
 */
function makeText(props) {
	return props.value;
}



/**
 *
 */
@pureRender
export default class SliderHandle extends Component {

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
		text: PropTypes.func,
		onChange: PropTypes.func
	}

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
		text: makeText,
		onChange: noop
	}

	/**
	 *
	 */
	constructor(props) {
		super(props);

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
	parentOffset() {
		const parent = findDOMNode(this).parentElement;
		return offset(parent);
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

		return this.props.step * step;
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
	emitChange(value) {
		value = this.bound(value);

		if (this.props.value !== value) {
			this.props.onChange(value);
		}
	}

	/**
	 *
	 */
	@autoBind
	handleMouseDown(event) {
		if (event.button === 0) {
			this.handleDragStart(event);
		}
	}

	/**
	 *
	 */
	@autoBind
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
	@autoBind
	handleDrag(event) {
		event.preventDefault();

		const rect = this.parentOffset();
		const ratio = this.isHorizontal()
			? percentage(event.pageX - rect.left, rect.width)
			: percentage(event.pageY - rect.top, rect.height);

		const max = this.props.max - this.props.min;
		const value = this.props.min + ((max / 100) * ratio);
		const snapped = this.snapped(value);

		this.emitChange(snapped);
	}

	/**
	 *
	 */
	@autoBind
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
	@autoBind
	handleMin() {
		this.emitChange(this.props.min);
	}

	/**
	 *
	 */
	@autoBind
	handleMax() {
		this.emitChange(this.props.max);
	}

	/**
	 *
	 */
	@autoBind
	handleIncrement() {
		this.emitChange(
			this.props.value + this.props.step
		);
	}

	/**
	 *
	 */
	@autoBind
	handleBigIncrement() {
		this.emitChange(
			this.props.value + this.props.bigStep
		);
	}

	/**
	 *
	 */
	@autoBind
	handleDecrement() {
		this.emitChange(
			this.props.value - this.props.step
		);
	}

	/**
	 *
	 */
	@autoBind
	handleBigDecrement() {
		this.emitChange(
			this.props.value - this.props.bigStep
		);
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
			<div className={className} style={this.style()}>
				<KeyHandler handlers={{
					[keys.HOME]: this.handleMin,
					[keys.END]: this.handleMax,
					[keys.ARROW.UP]: this.handleIncrement,
					[keys.ARROW.RIGHT]: this.handleIncrement,
					[keys.PAGE_UP]: this.handleBigIncrement,
					[keys.ARROW.DOWN]: this.handleDecrement,
					[keys.ARROW.LEFT]: this.handleDecrement,
					[keys.PAGE_DOWN]: this.handleBigDecrement
				}}>
					<div
						className="rea11y-slider-handle-control"
						role="slider"
						aria-valuemin={this.props.min}
						aria-valuemax={this.props.max}
						aria-valuenow={this.props.value}
						onMouseDown={this.handleMouseDown}
						tabIndex="0"
					></div>
				</KeyHandler>

				<div className="rea11y-slider-handle-text">
					{this.text()}
				</div>
			</div>
		);
	}

	/**
	 *
	 */
	text() {
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
