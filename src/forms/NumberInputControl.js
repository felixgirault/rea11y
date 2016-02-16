/**
 *
 */
import React, {PropTypes} from 'react';
import classNames from 'classnames';



/**
 *
 */
export default function NumberInputControl({name, title, text, onClick}) {
	const className = classNames([
		'rea11y-number-input-control',
		`rea11y-number-input-control-${name}`
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

/**
 *
 */
NumberInputControl.propTypes = {
	name: PropTypes.string,
	title: PropTypes.string,
	text: PropTypes.string,
	onClick: PropTypes.func
};
