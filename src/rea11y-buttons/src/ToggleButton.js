/**
 *
 */
import {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import classNames from 'classnames';
import noop from 'no-op';
import Button from './Button';



/**
 *
 */
@pureRender
export default class ToggleButton extends Component {

	/**
	 *
	 */
	static propTypes = {
		pressed: PropTypes.bool,
		text: PropTypes.string,
		pressedText: PropTypes.string,
		onToggle: PropTypes.func,
		onPress: PropTypes.func,
		onRelease: PropTypes.func
	}

	/**
	 *
	 */
	static defaultProps = {
		pressed: false,
		pressedText: '',
		onToggle: noop,
		onPress: noop,
		onRelease: noop
	}

	/**
	 *
	 */
	handleClick() {
		this.props.onToggle(!this.props.pressed);

		if (this.props.pressed) {
			this.props.onRelease();
		} else {
			this.props.onPress();
		}
	}

	/**
	 *
	 */
	render() {
		let props = this.props;

		props.className = classNames(props.className, {
			'rea11y-toggle-button': true,
			'rea11y-toggle-button-pressed': props.pressed
		});

		return (
			<Button
				{...props}
				aria-pressed={props.pressed}
				text={this.text()}
				onClick={::this.handleClick}
			/>
		);
	}

	/**
	 *
	 */
	text() {
		if (this.props.pressed) {
			return this.props.pressedText || this.props.text;
		}

		return this.props.text;
	}
}
