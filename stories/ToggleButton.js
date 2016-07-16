import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {StatefulToggleButton} from '../src';



/**
 *
 */
storiesOf('ToggleButton', module)
	.addWithInfo(
		'stateful',
		`
ARIA attributes:

* \`aria-pressed\` current state
		`,
		() => (
			<StatefulToggleButton
				text="Press me!"
				pressedText="Release me!"
				onPress={action('onPress')}
				onRelease={action('onRelease')}
				onToggle={action('onToggle')}
			/>
		),
		{
			inline: true,
			source: false,
			propTables: false
		}
	);
