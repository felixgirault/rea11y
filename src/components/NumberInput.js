/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import uid from 'uid';
import keys from 'offkey';
import noop from 'no-op';
import bound from '../utils/bound';
import KeyHandler from './KeyHandler';
import NumberInputControl from './NumberInputControl';



/**
 *
 */
@pureRender
export default class NumberInput extends Component {

	/**
	 *
	 */
	static propTypes = {
		id: PropTypes.string,
		incrementText: PropTypes.string,
		decrementText: PropTypes.string,
		incrementTitle: PropTypes.string,
		decrementTitle: PropTypes.string,
		min: PropTypes.number,
		max: PropTypes.number,
		step: PropTypes.number,
		bigStep: PropTypes.number,
		value: PropTypes.number,
		onChange: PropTypes.func
	}

	/**
	 *
	 */
	static defaultProps = {
		id: 'rea11y-' + uid(),
		incrementText: '⌃',
		decrementText: '⌄',
		incrementTitle: 'Increment',
		decrementTitle: 'Decrement',
		min: 0,
		max: 100,
		step: 1,
		bigStep: 10,
		value: 0,
		onChange: noop
	}

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.state = {
			value: props.value
		};
	}

	/**
	 *
	 */
	componentWillReceiveProps(props) {
		this.setState({
			value: props.value
		});
	}

	/**
	 *
	 */
	intVal(value) {
		const intVal = parseInt(value, 10);
		return isNaN(intVal) ? this.props.min : intVal;
	}

	/**
	 *
	 */
	bound(value) {
		return bound(value, this.props.min, this.props.max);
	}

	/**
	 *
	 */
	emitChange(value) {
		const boundValue = this.bound(value);

		if (this.props.value !== boundValue) {
			this.props.onChange(boundValue);
		}
	}

	/**
	 *
	 */
	@autoBind
	handleChange(event) {
		const value = parseInt(event.target.value, 10);

		if (isNaN(value)) {
			this.setState({
				value: ''
			});
		} else {
			this.emitChange(value);
		}
	}

	/**
	 *
	 */
	@autoBind
	handleBlur(event) {
		this.emitChange(
			this.intVal(event.target.value)
		);
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
			this.intVal(this.state.value) + this.props.step
		);
	}

	/**
	 *
	 */
	@autoBind
	handleBigIncrement() {
		this.emitChange(
			this.intVal(this.state.value) + this.props.bigStep
		);
	}

	/**
	 *
	 */
	@autoBind
	handleDecrement() {
		this.emitChange(
			this.intVal(this.state.value) - this.props.step
		);
	}

	/**
	 *
	 */
	@autoBind
	handleBigDecrement() {
		this.emitChange(
			this.intVal(this.state.value) - this.props.bigStep
		);
	}

	/**
	 *
	 */
	render() {
		return (
			<div className="rea11y-number-input">
				<KeyHandler handlers={{
					[keys.HOME]: this.handleMin,
					[keys.END]: this.handleMax,
					[keys.ARROW.UP]: this.handleIncrement,
					[keys.PAGE_UP]: this.handleBigIncrement,
					[keys.ARROW.DOWN]: this.handleDecrement,
					[keys.PAGE_DOWN]: this.handleBigDecrement
				}}>
					<input
						ref="input"
						id={this.props.id}
						className="rea11y-number-input-value"
						type="text"
						role="spinbutton"
						aria-valuemin={this.props.min}
						aria-valuemax={this.props.max}
						aria-valuenow={this.state.value}
						value={this.state.value}
						onChange={this.handleChange}
						onBlur={this.handleBlur}
					/>
				</KeyHandler>

				<div className="rea11y-number-input-controls">
					<NumberInputControl
						name="increment"
						title={this.props.incrementTitle}
						onClick={this.handleIncrement}
						text={this.props.incrementText}
					/>

					<NumberInputControl
						name="decrement"
						title={this.props.decrementTitle}
						onClick={this.handleDecrement}
						text={this.props.decrementText}
					/>
				</div>
			</div>
		);
	}
}
