import React, {PropTypes} from 'react';
import {pure} from 'recompose';
import classNames from 'classnames';
import {noop} from 'lodash';
import Button from './Button';



/**
 *
 */
const ToggleButton = ({pressed, text, pressedText, onToggle, onPress, onRelease, ...props}) => {
	const handleClick = () => {
		onToggle(!pressed);
		pressed ? onRelease() : onPress();
	}

	const className = classNames({
		'rea11y-ToggleButton': true,
		'rea11y-ToggleButton--pressed': pressed
	});

	return (
		<Button
			{...props}
			className={className}
			aria-pressed={pressed}
			onClick={handleClick}
			text={(pressed && pressedText) ? pressedText : text}
		/>
	);
};

ToggleButton.propTypes = {
	pressed: PropTypes.bool,
	text: PropTypes.string.isRequired,
	pressedText: PropTypes.string,
	onToggle: PropTypes.func,
	onPress: PropTypes.func,
	onRelease: PropTypes.func
};

ToggleButton.defaultProps = {
	pressed: false,
	pressedText: '',
	onToggle: noop,
	onPress: noop,
	onRelease: noop
};



export default pure(ToggleButton);
