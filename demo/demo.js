(function() {

	/**
	 *
	 */
	function $(id) {
		return document.getElementById(id);
	}



	/**
	 *
	 */
	function SyncedValue(value) {
		this.value = value;
		this.listeners = [];
	}

	SyncedValue.prototype.listen = function(listener) {
		this.listeners.push(listener);
	};

	SyncedValue.prototype.update = function(value) {
		this.value = value;
		this.listeners.forEach(function(listener) {
			listener(value);
		});
	};

	var syncedValue = new SyncedValue(42);



	/**
	 *
	 */
	React.render(
		<Rea11y.StatefulNumberInput />,
		$('number-input')
	);



	/**
	 *
	 */
	var SyncedProgressBar = React.createClass({

		getInitialState: function() {
			return {
				value: syncedValue.value
			};
		},

		componentDidMount: function() {
			syncedValue.listen(this.updateValue);
		},

		updateValue: function(value) {
			this.setState({
				value: value
			});
		},

		render: function() {
			return (
				<Rea11y.ProgressBar
					{...this.props}
					value={this.state.value}
				/>
			);
		}
	});

	React.render(
		<SyncedProgressBar
			target={$('progress-bar-target')}
		/>,
		$('progress-bar')
	);



	/**
	 *
	 */
	React.render(
		<Rea11y.StatefulSlider
			min={0}
			max={100}
			defaultValue={syncedValue.value}
			onChange={syncedValue.update.bind(syncedValue)}
		/>,
		$('slider')
	);

	React.render(
		<Rea11y.StatefulRangeSlider
			min={0}
			max={100}
			defaultLowerValue={16}
			defaultUpperValue={64}
		/>,
		$('range-slider')
	);



	/**
	 *
	 */
	var tabs = (
		<Rea11y.StatefulTabs defaultActive="first">
			<Rea11y.Panel name="first" title="First">
				<p>First panel's contents.</p>
			</Rea11y.Panel>

			<Rea11y.Panel name="second" title="Second">
				<p>Second panel's contents with a <a href="#tabs">link</a> inside.</p>
			</Rea11y.Panel>

			<Rea11y.Panel name="third" title="Third">
				<p>Third panel's contents with a <button>button</button> inside.</p>
			</Rea11y.Panel>
		</Rea11y.StatefulTabs>
	);

	React.render(tabs, $('tabs'));



	/**
	 *
	 */
	React.render(
		<Rea11y.Button text="Button" />,
		$('button')
	);

	React.render(
		<Rea11y.StatefulToggleButton
			text="Toggle button"
			pressedText="Pressed toggle button"
		/>,
		$('toggle-button')
	);



	/**
	 *
	 */
	var StatefulModal = React.createClass({

		getInitialState: function() {
			return {
				opened: false
			};
		},

		handleOpen: function() {
			this.setState({
				opened: true
			})
		},

		handleClose: function() {
			this.setState({
				opened: false
			})
		},

		render: function() {
			return (
				<div>
					<button onClick={this.handleOpen}>Open</button>
					{this.modal()}
				</div>
			);
		},

		modal: function() {
			if (!this.state.opened) {
				return undefined;
			}

			return (
				<Rea11y.Modal title="Modal" labelId="modal-title">
					<div className="rea11y-modal-header">
						<h1 className="rea11y-modal-title">
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
						<button onClick={this.handleClose}>
							Close
						</button>
					</div>
				</Rea11y.Modal>
			);
		}
	});

	React.render(<StatefulModal />, $('modal'));
})();
