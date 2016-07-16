import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {StatefulNumberInput, NumberInputControls} from '../src';



/**
 *
 */
storiesOf('NumberInput', module)
	.addWithInfo(
		'default',
		`
Keyboard interactions when the focus is inside the input:

* \`↑\` increments the value
* \`↓\` decrements the value
* \`Page up\` increments the value by a larger amount
* \`Page down\` decrements the value by a larger amount
* \`Home\` sets the value to the minimum
* \`End\` sets the value to the maximum
		`,
		() => (
			<StatefulNumberInput onChange={action('onChange')} />
		),
		{
			inline: true,
			source: false,
			propTables: false
		}
	)
	.addWithInfo(
		'controlable',
		`
In addition to the keyboards interactions, buttons can be
used to increment or decrement the value.
		`,
		() => (
			<StatefulNumberInput onChange={action('onChange')}>
				<NumberInputControls />
			</StatefulNumberInput>
		),
		{
			inline: true,
			source: false,
			propTables: false
		}
	);
