(function() {

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
	var SyncedProgress = React.createClass({

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
				<Reaccess.Progress
					orientation={this.props.orientation}
					max={100}
					value={this.state.value}
					text={this.text}
				/>
			);
		},

		text: function(props) {
			return props.percentage + '%';
		}
	});

	React.render(
		<SyncedProgress orientation="horizontal" />,
		document.getElementById('progress-horizontal')
	);

	React.render(
		<SyncedProgress orientation="vertical" />,
		document.getElementById('progress-vertical')
	);



	/**
	 *
	 */
	var SyncedSlider = React.createClass({

		getInitialState: function() {
			return {
				value: syncedValue.value
			};
		},

		updateValue: function(value) {
			this.setState({
				value: value
			}, function() {
				syncedValue.update(this.state.value)
			});
		},

		render: function() {
			return (
				<Reaccess.Slider
					min={0}
					max={100}
					value={this.state.value}
					text={this.text}
					onChange={this.updateValue}
				/>
			);
		},

		text: function(props) {
			return props.value;
		}
	});

	React.render(
		<SyncedSlider />,
		document.getElementById('slider')
	);



	/**
	 *
	 */
	var tabs = (
		<Reaccess.Tabs>
			<Reaccess.TabPanel name="first" title="First">
				<p>First tab's contents.</p>
			</Reaccess.TabPanel>

			<Reaccess.TabPanel name="second" title="Second">
				<p>Second tab's contents with a <a href="#">link</a> inside.</p>
			</Reaccess.TabPanel>

			<Reaccess.TabPanel name="third" title="Third">
				<p>Third tab's contents with a <button>button</button> inside.</p>
			</Reaccess.TabPanel>
		</Reaccess.Tabs>
	);

	React.render(tabs, document.getElementById('tabs'));
})();
