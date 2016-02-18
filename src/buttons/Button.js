/**
 *
 */
import React, {PropTypes} from 'react';



/**
 *
 */
export default function Button({text, ...props}) {
	return (
		<button
			{...props}
			className="rea11y-button"
			role="button"
		>
			{text}
		</button>
	);
}

/**
 *
 */
Button.propTypes = {
	text: PropTypes.string
};
