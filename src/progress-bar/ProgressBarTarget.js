/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';



/**
 *
 */
@pureRender
export default class ProgressBarTarget extends Component {

	/**
	 *
	 */
	static propTypes = {
		min: PropTypes.number,
		max: PropTypes.number,
		value: PropTypes.number,
		progressBarId: PropTypes.string,
		targetId: PropTypes.string,
		children: PropTypes.element
	};

	/**
	 *
	 */
	componentDidMount() {
		this.setupTarget();
		this.updateTarget();
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
		const {targetId, progressBarId} = this.props;
		const target = document.getElementById(targetId);

		if (target) {
			target.setAttribute('aria-describedby', progressBarId);
		}
	}

	/**
	 *
	 */
	updateTarget() {
		const {value, min, max, targetId} = this.props;
		const busy = (value > min) && (value < max);
		const target = document.getElementById(targetId);

		if (target) {
			target.setAttribute('aria-busy', busy);
		}
	}

	/**
	 *
	 */
	render() {
		return <noscript />;
	}
}
