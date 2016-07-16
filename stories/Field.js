import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {Field} from '../src';



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
