/**
 *
 */
import {Component, findDOMNode} from 'react';
import pureRender from 'pure-render-decorator';
import {on, off} from 'dom-helpers/events';
import {tabbable} from 'rea11y-utils';



/**
 *	Traps the focus around the component's children.
 */
@pureRender
export default class FocusTrap extends Component {

	/**
	 *	Initializes the component.
	 */
	componentDidMount() {
		const children = findDOMNode(this.refs.children);

		this.shiftPressed = false;
		this.previouslyFocused = document.activeElement;
		this.tabbable = tabbable(children);

		if (this.tabbable.length) {
			this.tabbable[0].focus();
		}

		on(document, 'keydown', ::this.handleKeyEvent);
		on(document, 'keyup', ::this.handleKeyEvent);
	}

	/**
	 *	Detaches event handlers and sets the focus back
	 *	to the element that triggered the modal.
	 */
	componentWillUnmount() {
		off(document, 'keydown', ::this.handleKeyEvent);
		off(document, 'keyup', ::this.handleKeyEvent);

		if (this.previouslyFocused) {
			this.previouslyFocused.focus();
		}
	}

	/**
	 *	Stores if the shift key is currently pressed.
	 *
	 *	@param object event Keyboard event.
	 */
	handleKeyEvent(event) {
		this.shiftPressed = event.shiftKey;
	}

	/**
	 *	Handles focus on the modal, avoiding it beeing
	 *	lost out of it.
	 *
	 *	@param object event Event.
	 */
	handleFocus() {
		if (!this.tabbable.length) {
			return;
		}

		const index = this.shiftPressed
			? this.tabbable.length - 1
			: 0;

		this.tabbable[index].focus();
	}

	/**
	 *
	 */
	render() {
		return (
			<div className="rea11y-focus-trap">
				<div onFocus={::this.handleFocus} tabIndex="0" />

				<div className="rea11y-focus-trap-children" ref="children">
					{this.props.children}
				</div>

				<div onFocus={::this.handleFocus} tabIndex="0" />
			</div>
		);
	}
}
