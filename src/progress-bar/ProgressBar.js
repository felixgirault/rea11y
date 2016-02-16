/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import classNames from 'classnames';
import {uniqueId} from 'lodash';
import percentage from '../utils/percentage';



/**
 *
 */
function makeText(props) {
	return `${props.percentage}%`;
}



/**
 *
 */
@pureRender
export default class ProgressBar extends Component {

	/**
	 *
	 */
	static propTypes = {
		orientation: PropTypes.string,
		min: PropTypes.number,
		max: PropTypes.number,
		value: PropTypes.number,
		text: PropTypes.func
	};

	/**
	 *
	 */
	static defaultProps = {
		orientation: 'horizontal',
		min: 0,
		max: 100,
		value: 0,
		text: makeText
	};

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.id = uniqueId('rea11y-');
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
				this.id
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
	text() {
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
			[property]: `${this.state.percentage}%`
		};
	}

	/**
	 *
	 */
	render() {
		const text = this.text();
		const className = classNames([
			'rea11y-progress-bar',
			`rea11y-progress-bar-${this.props.orientation}`
		]);

		return (
			<div
				id={this.id}
				className={className}
				role="progressbar"
				aria-valuemax={this.props.max}
				aria-valuenow={this.props.value}
				aria-valuetext={text}
			>
				<div className="rea11y-progress-bar-track">
					<div
						className="rea11y-progress-bar-value"
						style={this.style()}
					></div>
				</div>

				<div className="rea11y-progress-bar-text">
					{text}
				</div>
			</div>
		);
	}
}
