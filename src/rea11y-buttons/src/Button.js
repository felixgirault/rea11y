/**
 *
 */
import {Component, PropTypes} from 'react';
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
		let props = this.props;

		props.className = classNames(
			props.className,
			'rea11y-button'
		);

		return (
			<button {...props}>
				{props.text}
			</button>
		);
	}
}
