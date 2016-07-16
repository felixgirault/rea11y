import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {StatefulTabs, TabPanel} from '../src';



/**
 *
 */
storiesOf('Tabs', module)
	.addWithInfo(
		'horizontal',
		`
Keyboard interactions when the focus is a tab:

* \`↓\` or \`→\` activates the next tab
* \`↑\` or \`←\` activates the previous tab
		`,
		() => (
			<StatefulTabs defaultActive="first" onActive={action('onActive')}>
				<TabPanel name="first" title="First">
					<p>First panel's contents.</p>
				</TabPanel>

				<TabPanel name="second" title="Second">
					<p>
						Second panel's contents with a
						<a href="#tabs">link</a> inside.
					</p>
				</TabPanel>

				<TabPanel name="third" title="Third">
					<p>
						Third panel's contents with a
						<button>button</button> inside.
					</p>
				</TabPanel>
			</StatefulTabs>
		),
		{
			inline: true,
			source: false,
			propTables: false
		}
	);
