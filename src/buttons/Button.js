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
			className="r1y-Button"
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
