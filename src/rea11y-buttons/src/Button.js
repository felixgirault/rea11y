/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import classNames from 'classnames';



/**
 *
 */
@pureRender
export default class Button extends Component {

	/**
	 *
	 */
	static propTypes = {
		role: PropTypes.string,
		text: PropTypes.string
	}

	/**
	 *
	 */
	static defaultProps = {
		role: 'button'
	}

	/**
	 *
	 */
	render() {
		const className = classNames(
			this.props.className,
			'rea11y-button'
		);

		return (
			<button {...this.props} className={className}>
				{this.props.text}
			</button>
		);
	}
}
