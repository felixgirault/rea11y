import React, {Component, PropTypes} from 'react';
import {pure} from 'recompose';
import classNames from 'classnames';
import {uniqueId} from 'lodash';
import percentage from './utils/percentage';



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
const ProgressBar = (props) => {
	const {min, max, value, orientation, makeText, makeStyle} = props;

	const text = makeText(props);
	const style = makeStyle(props);

	const className = classNames([
		'rea11y-ProgressBar',
		`rea11y-ProgressBar--${orientation}`
	]);

	return (
		<div
			className={className}
			role="progressbar"
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
			aria-valuetext={text}
		>
			<div className="rea11y-ProgressBar-track">
				<div className="rea11y-ProgressBar-value" style={style} />
			</div>

			<div className="rea11y-ProgressBar-text">
				{text}
			</div>
		</div>
	);
};

ProgressBar.propTypes = {
	orientation: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	value: PropTypes.number,
	makeText: PropTypes.func,
	makeStyle: PropTypes.func
};

ProgressBar.defaultProps = {
	orientation: 'horizontal',
	min: 0,
	max: 100,
	value: 0,
	makeText: makeDefaultText,
	makeStyle: makeDefaultStyle
};



export default pure(ProgressBar);
