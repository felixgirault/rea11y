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
})();
