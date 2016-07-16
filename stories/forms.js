import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {Field, StatefulNumberInput, NumberInputControls} from '../src';



/**
 *
 */
storiesOf('Field', module)
	.addWithInfo(
		'default',
		`
The \`Field\` component enriches any type of form input with
a label, and optionally a hint and an error message, each of
which beeing linked with the input using \`aria-labelledby\`.

If an error message is set, the input is marked as invalid
using \`aria-invalid\`.

If the field is required, it is marked as such with both
\`aria-required\` and \`required\`.
		`,
		() => (
			<Field
				name="email"
				label="Email address"
				hint="For example: john.doe@example.com"
				error="Please enter a valid email address"
				required
			>
				<input type="email" />
			</Field>
		),
		{
			inline: true,
			source: false,
			propTables: false
		}
	)
	.addWithInfo(
		'reordered',
		`
The field components (label, input, error and hint) can be
reordered at will.
		`,
		() => (
			<Field
				name="email"
				label="Email address"
				hint="This is a stupid example"
				error="Please enter a valid email address"
				order={[Field.ERROR, Field.LABEL, Field.INPUT, Field.HINT]}
				required
			>
				<input type="email" />
			</Field>
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
