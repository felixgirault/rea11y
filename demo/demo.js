(function() {

	/**
	 *
	 */
	var progress = (
		<Reaccess.Progress max={100} value={42} text=":progress%" />
	);

	React.render(progress, document.getElementById('progress'));



	/**
	 *
	 */
	var tabs = (
		<Reaccess.Tabs>
			<Reaccess.Tab name="first" title="First">
				<p>First tab's contents.</p>
			</Reaccess.Tab>

			<Reaccess.Tab name="second" title="Second">
				<p>Second tab's contents with a <a href="#">link</a> inside.</p>
			</Reaccess.Tab>

			<Reaccess.Tab name="third" title="Third">
				<p>Third tab's contents with a <button>button</button> inside.</p>
			</Reaccess.Tab>
		</Reaccess.Tabs>
	);

	React.render(tabs, document.getElementById('tabs'));
})();
