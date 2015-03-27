/**
 *
 */
'use strict';

import React from 'react';



/**
 *
 */
export default class Progress extends React.Component {

	/**
	 *
	 */
	render() {
		const progress = this.progress();
		const text = this.text(progress);

		const style = {
			width: progress + '%'
		};

		return (
			<div
				className="reaccess-progress"
				role="progressbar"
				aria-valuemax={this.props.max}
				aria-valuenow={this.props.value}
				aria-valuetext={text}
			>
				<div className="reaccess-progress-max">
					<div className="reaccess-progress-value" style={style}></div>
				</div>

				<div className="reaccess-progress-text">{text}</div>
			</div>
		);
	}



	/**
	 *
	 */
	progress() {
		if (this.props.value === 0) {
			return 0;
		}

		return ((this.props.value * 100) / this.props.max);
	}



	/**
	 *
	 */
	text(progress) {
		if (!this.props.text) {
			return '';
		}

		const text = this.props.text;

		if (typeof text === 'function') {
			return text(progress);
		}

		return text.replace(':progress', progress);
	}
}



/**
 *
 */
Progress.propTypes = {
	max: React.PropTypes.number,
	value: React.PropTypes.number,
	text: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.func
	])
};



/**
 *
 */
Progress.defaultProps = {
	max: 100,
	value: 0,
	text: ':progress'
};
