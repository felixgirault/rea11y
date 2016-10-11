import React, {Component, PropTypes, Children, cloneElement} from 'react';
import {pure} from 'recompose';
import classNames from 'classnames';
import {ARROW, PAGE_UP, PAGE_DOWN, HOME, END} from 'offkey';
import {bindAll, noop, uniqueId} from 'lodash';
import bound from './utils/bound';
import KeyHandler from './KeyHandler';



/**
 *
 */
class NumberInput extends Component {

	/**
	 *
	 */
	static propTypes = {
		min: PropTypes.number,
		max: PropTypes.number,
		step: PropTypes.number,
		bigStep: PropTypes.number,
		value: PropTypes.number,
		onChange: PropTypes.func,
		children: PropTypes.element
	};

	/**
	 *
	 */
	static defaultProps = {
		min: 0,
		max: 100,
		step: 1,
		bigStep: 10,
		value: 0,
		onChange: noop
	};

	/**
	 *
	 */
	constructor(props) {
		super(props);
		bindAll(
			this,
			'handleChange',
			'handleBlur',
			'handleMin',
			'handleMax',
			'handleIncrement',
			'handleBigIncrement',
			'handleDecrement',
			'handleBigDecrement'
		);

		this.id = uniqueId('rea11y-');
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
		const number = parseInt(value, 10);
		return isNaN(number) ? this.props.min : number;
	}

	/**
	 *
	 */
	emitChange(newValue) {
		const {min, max, value, onChange} = this.props;
		const boundValue = bound(newValue, min, max);

		if (value !== boundValue) {
			onChange(boundValue);
		}
	}

	/**
	 *
	 */
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
	handleBlur(event) {
		this.emitChange(
			this.intVal(event.target.value)
		);
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
		this.emitChange(
			this.intVal(this.state.value) + this.props.step
		);
	}

	/**
	 *
	 */
	handleBigIncrement() {
		this.emitChange(
			this.intVal(this.state.value) + this.props.bigStep
		);
	}

	/**
	 *
	 */
	handleDecrement() {
		this.emitChange(
			this.intVal(this.state.value) - this.props.step
		);
	}

	/**
	 *
	 */
	handleBigDecrement() {
		this.emitChange(
			this.intVal(this.state.value) - this.props.bigStep
		);
	}

	/**
	 *
	 */
	renderControls() {
		try {
			const controls = Children.only(this.props.children);

			return cloneElement(controls, {
				onIncrement: this.handleIncrement,
				onDecrement: this.handleDecrement
			});
		} catch (e) {
			return undefined;
		}
	}

	/**
	 *
	 */
	render() {
		const controls = this.renderControls();
		const className = classNames({
			'rea11y-NumberInput': true,
			'rea11y-NumberInput--withControls': !!controls
		});

		return (
			<div className={className}>
				<KeyHandler
					handlers={{
						[HOME]: this.handleMin,
						[END]: this.handleMax,
						[ARROW.UP]: this.handleIncrement,
						[PAGE_UP]: this.handleBigIncrement,
						[ARROW.DOWN]: this.handleDecrement,
						[PAGE_DOWN]: this.handleBigDecrement
					}}
				>
					<input
						ref="input"
						id={this.id}
						className="rea11y-NumberInput-value"
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

				{controls}
			</div>
		);
	}
}



export default pure(NumberInput);
