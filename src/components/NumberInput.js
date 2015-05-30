/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import classNames from 'classnames';
import uid from 'uid';
import keys from 'offkey';
import noop from 'no-op';
import bound from '../utils/bound';



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
	@autoBind
	handleKeyDown(event) {
		let value = this.props.value;

		switch (event.keyCode) {
			case keys.PAGE_UP:
				value += this.props.bigStep;
				break;

			case keys.PAGE_DOWN:
				value -= this.props.bigStep;
				break;

			case keys.END:
				value = this.props.max;
				break;

			case keys.HOME:
				value = this.props.min;
				break;

			case keys.ARROW.DOWN:
				value -= this.props.step;
				break;

			case keys.ARROW.UP:
				value += this.props.step;
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
	@autoBind
	handleChange(event) {
		const value = parseInt(event.target.value, 10);

		this.props.onChange(
			value || this.props.min
		);
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
	handleDecrement() {
		this.emitChange(
			this.props.value - this.props.step
		);
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
		value = this.bound(value);

		if (this.props.value !== value) {
			this.props.onChange(value);
		}
	}

	/**
	 *
	 */
	render() {
		return (
			<div className="rea11y-number-input">
				<input
					id={this.props.id}
					className="rea11y-number-input-value"
					type="text"
					role="spinbutton"
					aria-valuemin={this.props.min}
					aria-valuemax={this.props.max}
					aria-valuenow={this.props.value}
					value={this.props.value}
					onKeyDown={this.handleKeyDown}
					onChange={this.handleChange}
				/>

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



/**
 *
 */
class NumberInputControl extends Component {

	/**
	 *
	 */
	render() {
		const className = classNames([
			'rea11y-number-input-control',
			'rea11y-number-input-control-' + this.props.name
		]);

		return (
			<button
				className={className}
				title={this.props.title}
				onClick={this.props.onClick}
			>
				{this.props.text}
			</button>
		);
	}
}
