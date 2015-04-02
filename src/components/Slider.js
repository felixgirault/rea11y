/**
 *
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import bindMethods from '../utils/bindMethods';
import percentage from '../utils/percentage';
import SliderHandle from './SliderHandle';



/**
 *
 */
export default class Slider extends React.Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.state = {
			percentage: percentage(
				props.value,
				props.max,
				props.min
			)
		};

		bindMethods(
			this,
			'handleDecrement',
			'handleBigDecrement',
			'handleMin',
			'handleIncrement',
			'handleBigIncrement',
			'handleMax'
		);
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
	decremented(step) {
		const dec = this.props.value - step;

		return (dec < this.props.min)
			? this.props.min
			: dec;
	}

	/**
	 *
	 */
	incremented(step) {
		const inc = this.props.value + step;

		return (inc > this.props.max)
			? this.props.max
			: inc;
	}

	/**
	 *
	 */
	handleDecrement() {
		this.props.onChange(
			this.decremented(this.props.step)
		);
	}

	/**
	 *
	 */
	handleBigDecrement() {
		this.props.onChange(
			this.decremented(this.props.bigStep)
		);
	}

	/**
	 *
	 */
	handleMin() {
		this.props.onChange(this.props.min);
	}

	/**
	 *
	 */
	handleIncrement() {
		this.props.onChange(
			this.incremented(this.props.step)
		);
	}

	/**
	 *
	 */
	handleBigIncrement() {
		this.props.onChange(
			this.incremented(this.props.bigStep)
		);
	}

	/**
	 *
	 */
	handleMax() {
		this.props.onChange(this.props.max);
	}

	/**
	 *
	 */
	render() {
		const text = this.text();
		const style = this.style();

		const className = classNames([
			'reaccess-slider',
			'reaccess-slider-' + this.props.orientation
		]);

		return (
			<div className={className}>
				<div className="reaccess-slider-max">
					<div className="reaccess-slider-range"></div>

					<SliderHandle
						min={this.props.min}
						max={this.props.max}
						value={this.props.value}
						text={text}
						onDecrement={this.handleDecrement}
						onBigDecrement={this.handleBigDecrement}
						onMin={this.handleMin}
						onIncrement={this.handleIncrement}
						onBigIncrement={this.handleBigIncrement}
						onMax={this.handleMax}
						style={style}
					/>
				</div>
			</div>
		);
	}

	/**
	 *
	 */
	text() {
		if (typeof this.props.text !== 'function') {
			return null;
		}

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
		const property = (this.props.orientation === 'horizontal')
			? 'left'
			: 'bottom';

		return {
			[property]: this.state.percentage + '%'
		};
	}
}



/**
 *
 */
Slider.propTypes = {
	orientation: React.PropTypes.string,
	min: React.PropTypes.number,
	max: React.PropTypes.number,
	value: React.PropTypes.number,
	step: React.PropTypes.number,
	bigStep: React.PropTypes.number,
	text: React.PropTypes.string,
	onChange: React.PropTypes.func
};

/**
 *
 */
Slider.defaultProps = {
	orientation: 'horizontal',
	min: 0,
	max: 100,
	value: 0,
	step: 1,
	bigStep: 10,
	text: '',
	onChange: null
};
