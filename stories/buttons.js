import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {Button, ToggleButton, StatefulToggleButton} from '../src';



/**
 *
 */
storiesOf('Button', module)
	.addWithInfo(
		'default',
		`
ARIA attributes:

* \`role="button"\` to avoid accidentally submitting a form
the button sits in.
		`,
		() => (
			<Button text="Hello" onClick={action('onClick')} />
		),
		{
			inline: true,
			source: false,
			propTables: false
		}
	);

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
