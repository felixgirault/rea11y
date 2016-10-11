import React, {PropTypes} from 'react';
import {pure} from 'recompose';
import classNames from 'classnames';



/**
 *
 */
const NumberInputControl = ({name, title, text, onClick}) => {
	const className = classNames([
		'rea11y-NumberInputControl',
		`rea11y-NumberInputControl-${name}`
	]);

	return (
		<button
			className={className}
			title={title}
			onClick={onClick}
		>
			{text}
		</button>
	);
}

NumberInputControl.propTypes = {
	name: PropTypes.string,
	title: PropTypes.string,
	text: PropTypes.string,
	onClick: PropTypes.func
};



export default pure(NumberInputControl);
