import React, {Component} from 'react';
import {Modal} from 'rea11y-modal';



/**
 *
 */
export default function ModalDemo() {
	return (
		<article className="pattern">
			<header>
				<h2 className="pattern-name">Modal</h2>
			</header>

			<p>
				When a modal is opened, focus is trapped inside it.
				On close, the focus is given back to the element
				that opened it.
			</p>

			<ul className="pattern-interactions">
				<li className="pattern-interaction">
					<span>Close</span>
					<span><kbd>Escape</kbd></span>
				</li>
			</ul>

			<div className="pattern-example">

			</div>
		</article>
	);
}

/**
 *
 */
class StatefulModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			opened: false
		};
	}

	handleOpen() {
		this.setState({
			opened: true
		})
	}

	handleClose() {
		this.setState({
			opened: false
		})
	}

	render() {
		return (
			<div>
				<button onClick={::this.handleOpen}>
					Open
				</button>

				{this.renderModal()}
			</div>
		);
	}

	renderModal() {
		if (!this.state.opened) {
			return undefined;
		}

		return (
			<Modal labelId="modal-title">
				<div className="rea11y-modal-header">
					<h1 id="modal-title" className="rea11y-modal-title">
						This is a modal
					</h1>
				</div>

				<div className="rea11y-modal-body">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua.
					</p>

					<p>
						Ut enim ad minim veniam, quis nostrud exercitation
						ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in
						voluptate velit esse cillum dolore eu fugiat nulla
						pariatur.
					</p>

					<p>
						Excepteur sint occaecat cupidatat non proident, sunt
						in culpa qui officia deserunt mollit anim id est
						laborum.
					</p>
				</div>

				<div className="rea11y-modal-footer">
					<button>Do nothing</button>
					<button onClick={::this.handleClose}>
						Close
					</button>
				</div>
			</Modal>
		);
	}
}
