import {Component, PropTypes, Children, cloneElement} from 'react';
import {pure} from 'recompose';
import autoBind from 'autobind-decorator';



/**
 *
 */
class KeyHandler extends Component {

	/**
	 *
	 */
	static propTypes = {
		handlers: PropTypes.objectOf(PropTypes.func),
		children: PropTypes.element.isRequired
	};

	/**
	 *
	 */
	static defaultProps = {
		handlers: {}
	};

	/**
	 *
	 */
	@autoBind
	handleKeyDown(event) {
		const code = event.keyCode;

		if (code in this.props.handlers) {
			event.preventDefault();
			this.props.handlers[code]();
		}
	}

	/**
	 *
	 */
	render() {
		const child = Children.only(this.props.children);

		return cloneElement(child, {
			onKeyDown: this.handleKeyDown
		});
	}
}



export default pure(KeyHandler);
