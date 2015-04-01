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
