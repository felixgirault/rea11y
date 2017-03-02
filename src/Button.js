import React, {PropTypes} from 'react';
import {pure} from 'recompose';



/**
 *
 */
const Button = ({text, ...props}) => (
	<button className="rea11y-Button" type="button" {...props}>
		{text}
	</button>
);

Button.propTypes = {
	text: PropTypes.node.isRequired
};



export default pure(Button);
