/**
 *
 */
'use strict';

import React from 'react';
import bindMethods from '../utils/bindMethods';



/**
 *
 */
export default class SliderHandle extends React.Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		bindMethods(
			this,
			'handleKeydown'
		);
	}

	/**
	 *
	 */
	handleKeydown(event) {
		switch (event.keyCode) {
			case 33: // page up
				this.trigger(this.props.onBigIncrement);
				break;

			case 34: // page down
				this.trigger(this.props.onBigDecrement);
				break;

			case 35: // end
				this.trigger(this.props.onMax);
				break;

			case 36: // home
				this.trigger(this.props.onMin);
				break;

			case 37: // left
			case 40: // down
				this.trigger(this.props.onDecrement);
				break;

			case 38: // up
			case 39: // right
				this.trigger(this.props.onIncrement);
				break;

			default:
				return;
		}

		event.preventDefault();
	}

	/**
	 *
	 */
	trigger(callback) {
		if (callback) {
			callback();
		}
	}

	/**
	 *
	 */
	render() {
		return (
			<div
				className="reaccess-slider-handle"
				style={this.props.style}
			>
				<div
					className="reaccess-slider-handle-control"
					role="slider"
					aria-valuemin={this.props.min}
					aria-valuemax={this.props.max}
					aria-valuenow={this.props.value}
					onKeyDown={this.handleKeydown}
					tabIndex="0"
				></div>

				<div className="reaccess-slider-handle-text">
					{this.props.text}
				</div>
			</div>
		);
	}
}



/**
 *
 */
SliderHandle.propTypes = {
	min: React.PropTypes.number,
	max: React.PropTypes.number,
	value: React.PropTypes.number,
	percentage: React.PropTypes.number,
	text: React.PropTypes.string,
	onDecrement: React.PropTypes.func,
	onBigDecrement: React.PropTypes.func,
	onMin: React.PropTypes.func,
	onIncrement: React.PropTypes.func,
	onBigIncrement: React.PropTypes.func,
	onMax: React.PropTypes.func,
	style: React.PropTypes.object
};

/**
 *
 */
SliderHandle.defaultProps = {
	min: 0,
	max: 100,
	value: 0,
	percentage: 0,
	text: '',
	onDecrement: null,
	onBigDecrement: null,
	onMin: null,
	onIncrement: null,
	onBigIncrement: null,
	onMax: null,
	style: {}
};
