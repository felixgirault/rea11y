import React, {PropTypes} from 'react';
import {pure} from 'recompose';



/**
 *
 */
const Button = ({text, ...props}) => (
	<button {...props} className="r1y-Button" role="button">
		{text}
	</button>
);

Button.propTypes = {
	text: PropTypes.string
};



export default pure(Button);
