/**
 *
 */
'use strict';

import React from 'react';
import classNames from 'classnames';
import percentage from '../utils/percentage';



/**
 *
 */
export default class Progress extends React.Component {

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
			'reaccess-progress',
			'reaccess-progress-' + this.props.orientation
		]);

		return (
			<div
				className={className}
				role="progressbar"
				aria-valuemax={this.props.max}
				aria-valuenow={this.props.value}
				aria-valuetext={text}
			>
				<div className="reaccess-progress-max">
					<div
						className="reaccess-progress-value"
						style={style}
					></div>
				</div>

				<div className="reaccess-progress-text">
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
	orientation: React.PropTypes.string,
	max: React.PropTypes.number,
	value: React.PropTypes.number,
	text: React.PropTypes.func
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
