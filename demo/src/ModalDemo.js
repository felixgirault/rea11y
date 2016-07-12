import React, {Component} from 'react';
import autoBind from 'autobind-decorator';
import {Modal} from '../../src';



/**
 *
 */
export default function ModalDemo() {
	return (
		<article className="Pattern">
			<header>
				<h2 className="Pattern-name">Modal</h2>
			</header>

			<p>
				When a modal is open, focus is trapped inside it.
				On close, the focus is given back to the element
				that opened it.
			</p>

			<ul className="Pattern-interactions">
				<li className="Pattern-interaction">
					<span>Close</span>
					<span><kbd>Escape</kbd></span>
				</li>
			</ul>

			<div className="Pattern-example">
				<StatefulModal />
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
			open: false
		};
	}

	@autoBind
	handleOpen() {
		this.setState({
			open: true
		});
	}

	@autoBind
	handleClose() {
		this.setState({
			open: false
		});
	}

	renderModal() {
		if (!this.state.open) {
			return undefined;
		}

		return (
			<Modal labelId="Modal-title" onClose={this.handleClose}>
				<div className="Modal-header">
					<h1 id="Modal-title" className="Modal-title">
						This is a modal
					</h1>
				</div>

				<div className="Modal-body">
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

				<div className="Modal-footer">
					<button>Do nothing</button>
					<button onClick={this.handleClose}>
						Close
					</button>
				</div>
			</Modal>
		);
	}

	render() {
		return (
			<div>
				<button onClick={this.handleOpen}>
					Open
				</button>

				{this.renderModal()}
			</div>
		);
	}
}
