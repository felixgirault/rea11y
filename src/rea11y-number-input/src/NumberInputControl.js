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
export default class NumberInputControl extends Component {

	/**
	 *
	 */
	static propTypes = {
		name: PropTypes.string,
		title: PropTypes.string,
		text: PropTypes.string,
		onClick: PropTypes.func
	}

	/**
	 *
	 */
	render() {
		const className = classNames([
			'rea11y-number-input-control',
			'rea11y-number-input-control-' + this.props.name
		]);

		return (
			<button
				className={className}
				title={this.props.title}
				onClick={this.props.onClick}
			>
				{this.props.text}
			</button>
		);
	}
}
