import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import debounce from 'debounce';
import {StatefulSlider} from '../src';



/**
 *
 */
const handleChange = debounce(action('onChange'), 100);

/**
 *
 */
storiesOf('Slider', module)
	.addWithInfo(
		'Simple',
		`
Keyboard interactions when the focus is on the handle:

* \`↑\` or \`→\` increments the value
* \`↓\` or \`←\` decrements the value
* \`Page up\` increments the value by a larger amount
* \`Page down\` decrements the value by a larger amount
* \`Home\` sets the value to the minimum
* \`End\` sets the value to the maximum
		`,
		() => (
			<StatefulSlider
				defaultValues={[16]}
				onChange={handleChange}
			/>
		),
		{
			inline: true,
			source: false,
			propTables: false
		}
	)
	.addWithInfo(
		'Range',
		`
A slider can accept any number of handles.

Each handle provides the same interactions as one from a
simple slider.
		`,
		() => (
			<StatefulSlider
				defaultValues={[16, 64, 96]}
				onChange={handleChange}
			/>
		),
		{
			inline: true,
			source: false,
			propTables: false
		}
	);
