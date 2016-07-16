import {PropTypes, Children, cloneElement} from 'react';
import {pure} from 'recompose';



/**
 *
 */
const KeyHandler = ({handlers, children}) => {
	const child = Children.only(children);

	return cloneElement(child, {
		onKeyDown(event) {
			const code = event.keyCode;

			if (code in handlers) {
				event.preventDefault();
				handlers[code]();
			}
		}
	});
};

KeyHandler.propTypes = {
	handlers: PropTypes.objectOf(PropTypes.func),
	children: PropTypes.element.isRequired
};

KeyHandler.defaultProps = {
	handlers: {}
};



export default pure(KeyHandler);
