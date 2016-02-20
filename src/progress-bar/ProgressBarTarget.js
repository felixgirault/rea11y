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
		min: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
		progressBarId: PropTypes.string.isRequired,
		targetId: PropTypes.string.isRequired,
		children: PropTypes.element.isRequired
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
