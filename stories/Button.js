import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {Button} from '../src';



/**
 *
 */
storiesOf('Button', module)
	.addWithInfo(
		'default',
		`
Attributes:

* \`type="button"\` to avoid accidentally submitting a form
the button might sit in.
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
