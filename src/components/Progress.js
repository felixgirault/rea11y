/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import classNames from 'classnames';
import percentage from '../utils/percentage';



/**
 *
 */
export default class Progress extends Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.state = {
			percentage: percentage(props.value, props.max)
		};
	}

	/**
	 *
	 */
	componentWillReceiveProps(props) {
		this.setState({
			percentage: percentage(props.value, props.max)
		});
	}

	/**
	 *
	 */
	render() {
		const text = this.text();
		const style = this.style();

		const className = classNames([
			'rea11y-progress',
			'rea11y-progress-' + this.props.orientation
		]);

		return (
			<div
				className={className}
				role="progressbar"
				aria-valuemax={this.props.max}
				aria-valuenow={this.props.value}
				aria-valuetext={text}
			>
				<div className="rea11y-progress-track">
					<div
						className="rea11y-progress-value"
						style={style}
					></div>
				</div>

				<div className="rea11y-progress-text">
					{text}
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
			? 'width'
			: 'height';

		return {
			[property]: this.state.percentage + '%'
		};
	}
}



/**
 *
 */
Progress.propTypes = {
	orientation: PropTypes.string,
	max: PropTypes.number,
	value: PropTypes.number,
	text: PropTypes.func
};

/**
 *
 */
Progress.defaultProps = {
	orientation: 'horizontal',
	max: 100,
	value: 0,
	text: ':progress'
};
