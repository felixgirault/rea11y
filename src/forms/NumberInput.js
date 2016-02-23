/**
 *
 */
import React, {Component, PropTypes, Children, cloneElement} from 'react';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import classNames from 'classnames';
import {ARROW, PAGE_UP, PAGE_DOWN, HOME, END} from 'offkey';
import {noop, uniqueId} from 'lodash';
import bound from '../utils/bound';
import KeyHandler from '../utils/KeyHandler';



/**
 *
 */
@pureRender
export default class NumberInput extends Component {

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
			'rea11y-number-input': true,
			'rea11y-number-input-has-controls': !!controls
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

				{controls}
			</div>
		);
	}
}
