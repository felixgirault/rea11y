/**
 *
 */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import autoBind from 'autobind-decorator';
import classNames from 'classnames';
import {noop} from 'lodash';
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
	};

	/**
	 *
	 */
	static defaultProps = {
		pressed: false,
		pressedText: '',
		onToggle: noop,
		onPress: noop,
		onRelease: noop
	};

	/**
	 *
	 */
	@autoBind
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
	text() {
		if (this.props.pressed) {
			return this.props.pressedText || this.props.text;
		}

		return this.props.text;
	}

	/**
	 *
	 */
	render() {
		const className = classNames({
			'rea11y-toggle-button': true,
			'rea11y-toggle-button-pressed': this.props.pressed
		});

		return (
			<Button
				{...this.props}
				className={className}
				aria-pressed={this.props.pressed}
				text={this.text()}
				onClick={this.handleClick}
			/>
		);
	}
}
