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
function makeDefaultText({min, max, value}) {
	const progress = Math.round(percentage(value, max, min));
	return `${progress}%`;
}

/**
 *
 */
function makeDefaultStyle({min, max, value, orientation}) {
	const dimension = percentage(value, max, min);
	const property = (orientation === 'horizontal')
		? 'width'
		: 'height';

	return {
		[property]: `${dimension}%`
	};
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
		makeText: PropTypes.func,
		makeStyle: PropTypes.func
	};

	/**
	 *
	 */
	static defaultProps = {
		orientation: 'horizontal',
		min: 0,
		max: 100,
		value: 0,
		makeText: makeDefaultText,
		makeStyle: makeDefaultStyle
	};

	/**
	 *
	 */
	constructor(props) {
		super(props);

		this.id = uniqueId('rea11y-');
	}

	/**
	 *
	 */
	render() {
		const {min, max, value, makeText, makeStyle} = this.props;

		const text = makeText(this.props);
		const style = makeStyle(this.props);

		const className = classNames([
			'r1y-ProgressBar',
			`r1y-ProgressBar--${this.props.orientation}`
		]);

		return (
			<div
				id={this.id}
				className={className}
				role="progressbar"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				aria-valuetext={text}
			>
				<div className="r1y-ProgressBar-track">
					<div
						className="r1y-ProgressBar-value"
						style={style}
					/>
				</div>

				<div className="r1y-ProgressBar-text">
					{text}
				</div>
			</div>
		);
	}
}
