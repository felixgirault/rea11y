/**
 *
 */
'use strict';

import {Component, PropTypes} from 'react';
import uid from 'uid';
import classNames from 'classnames';
import percentage from '../utils/percentage';



/**
 *
 */
export default class ProgressBar extends Component {

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.state = {
			percentage: percentage(props.value, props.max)
		};

		this.setupTarget();
		this.updateTarget();
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
	componentDidUpdate() {
		this.updateTarget();
	}

	/**
	 *
	 */
	setupTarget() {
		if (this.props.target) {
			this.props.target.setAttribute(
				'aria-describedby',
				this.props.id
			);
		}
	}

	/**
	 *
	 */
	updateTarget() {
		if (this.props.target) {
			const {value, min, max} = this.props;
			const busy = (value > min) && (value < max);

			this.props.target.setAttribute('aria-busy', busy);
		}
	}

	/**
	 *
	 */
	render() {
		const text = this.text();
		const style = this.style();

		const className = classNames([
			'rea11y-progress-bar',
			'rea11y-progress-bar-' + this.props.orientation
		]);

		return (
			<div
				id={this.props.id}
				className={className}
				role="progressbar"
				aria-valuemax={this.props.max}
				aria-valuenow={this.props.value}
				aria-valuetext={text}
			>
				<div className="rea11y-progress-bar-track">
					<div className="rea11y-progress-bar-value" style={style}></div>
				</div>

				<div className="rea11y-progress-bar-text">
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
ProgressBar.propTypes = {
	id: PropTypes.string,
	orientation: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	value: PropTypes.number,
	text: PropTypes.func
};

/**
 *
 */
ProgressBar.defaultProps = {
	id: 'rea11y-' + uid(),
	orientation: 'horizontal',
	min: 0,
	max: 100,
	value: 0,
	text: ':progress'
};
