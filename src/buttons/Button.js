/**
 *
 */
import React, {Component, PropTypes} from 'react';



/**
 *
 */
export default function Button(props) {
	return (
		<button
			className="rea11y-button"
			role="button"
			{...props}
		>
			{props.text}
		</button>
	);
}

/**
 *
 */
Button.propTypes = {
	role: PropTypes.string,
	text: PropTypes.string
};
