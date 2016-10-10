import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {debounce} from 'lodash';
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
		'horizontal',
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
				defaultValue={16}
				onChange={handleChange}
			/>
		),
		{
			inline: true,
			source: false,
			propTables: false
		}
	);
