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
		const text = this.props.text.replace(':progress', progress);
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
}



/**
 *
 */
Progress.propTypes = {
	max: React.PropTypes.number,
	value: React.PropTypes.number,
	text: React.PropTypes.string
};



/**
 *
 */
Progress.defaultProps = {
	max: 100,
	value: 0,
	text: ':progress'
};
