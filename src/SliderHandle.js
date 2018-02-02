import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {pure} from 'recompose';
import classNames from 'classnames';
import {ARROW, PAGE_UP, PAGE_DOWN, HOME, END} from 'offkey';
import {bindAll, noop} from 'lodash';
import {atLeast, atMost} from './utils/bound';
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
		index: PropTypes.number,
		min: PropTypes.number,
		max: PropTypes.number,
		lowerBound: PropTypes.number,
		upperBound: PropTypes.number,
		value: PropTypes.number,
		step: PropTypes.number,
		bigStep: PropTypes.number,
		makeText: PropTypes.func,
		makeStyle: PropTypes.func,
		onDragStart: PropTypes.func,
		onChange: PropTypes.func
	};

	/**
	 *
	 */
	static defaultProps = {
		orientation: 'horizontal',
		index: 0,
		min: 0,
		max: 100,
		lowerBound: 0,
		upperBound: 100,
		value: 0,
		step: 1,
		bigStep: 10,
		makeText: makeDefaultText,
		makeStyle: makeDefaultStyle,
		onDragStart: noop,
		onChange: noop
	};

	/**
	 *
	 */
	constructor(props) {
		super(props);
		bindAll(
			this,
			'handleMouseDown',
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
	}

	/**
	 *
	 */
	handleMouseDown(event) {
		if (event.button === 0) {
			const {index, onDragStart} = this.props;
			onDragStart(index);
		}
	}

	/**
	 *
	 */
	handleMin() {
		const {index, lowerBound, onChange} = this.props;
		onChange(index, lowerBound);
	}

	/**
	 *
	 */
	handleMax() {
		const {index, upperBound, onChange} = this.props;
		onChange(index, upperBound);
	}

	/**
	 *
	 */
	handleIncrement() {
		const {index, value, step, upperBound, onChange} = this.props;
		onChange(index, atMost(value + step, upperBound));
	}

	/**
	 *
	 */
	handleBigIncrement() {
		const {index, value, bigStep, upperBound, onChange} = this.props;
		onChange(index, atMost(value + bigStep, upperBound));
	}

	/**
	 *
	 */
	handleDecrement() {
		const {index, value, step, lowerBound, onChange} = this.props;
		onChange(index, atLeast(value - step, lowerBound));
	}

	/**
	 *
	 */
	handleBigDecrement() {
		const {index, value, bigStep, lowerBound, onChange} = this.props;
		onChange(index, atLeast(value - bigStep, lowerBound));
	}

	/**
	 *
	 */
	render() {
		const {lowerBound, upperBound, value, makeText, makeStyle} = this.props;

		const text = makeText(this.props);
		const style = makeStyle(this.props);
		const className = classNames({
			'rea11y-SliderHandle': true,
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
						className="rea11y-SliderHandle-control"
						role="slider"
						aria-valuemin={lowerBound}
						aria-valuemax={upperBound}
						aria-valuenow={value}
						aria-valuetext={text}
						onMouseDown={this.handleMouseDown}
						tabIndex="0"
					></div>
				</KeyHandler>

				<div className="rea11y-SliderHandle-text">
					{text}
				</div>
			</div>
		);
	}
}



export default pure(SliderHandle);
