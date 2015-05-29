/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import uid from 'uid';
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
		value: 0,
		onChange: noop
	}

	/**
	 *
	 */
	@autoBind
	handleChange(e) {
		this.props.onChange(
			this.boundValue(e.target.value)
		);
	}

	/**
	 *
	 */
	@autoBind
	handleIncrement() {
		this.props.onChange(
			this.boundValue(
				this.props.value + this.props.step
			)
		);
	}

	/**
	 *
	 */
	@autoBind
	handleDecrement() {
		this.props.onChange(
			this.boundValue(
				this.props.value - this.props.step
			)
		);
	}

	/**
	 *
	 */
	boundValue(value) {
		return bound(value, this.props.min, this.props.max);
	}

	/**
	 *
	 */
	render() {
		return (
			<div className="rea11y-number-input">
				<input
					id={this.props.id}
					type="text"
					className="rea11y-number-input-value"
					value={this.props.value}
					onChange={this.handleChange}
				/>

				<div className="rea11y-number-input-controls">
					<button
						className={`
							rea11y-number-input-control
							rea11y-number-input-control-up
						`}
						title={this.props.incrementTitle}
						onClick={this.handleIncrement}
					>
						{this.props.incrementText}
					</button>

					<button
						className={`
							rea11y-number-input-control
							rea11y-number-input-control-down
						`}
						title={this.props.decrementTitle}
						onClick={this.handleDecrement}
					>
						{this.props.decrementText}
					</button>
				</div>
			</div>
		);
	}
}
