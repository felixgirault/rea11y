import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {ProgressBar} from '../src';



/**
 *
 */
storiesOf('ProgressBar', module)
	.addWithInfo(
		'horizontal',
		`
ARIA attributes:

* \`aria-valuemin\` minimum value
* \`aria-valuemax\` maximum value
* \`aria-valuenow\` current value
* \`aria-valuetext\` text label
		`,
		() => (
			<ProgressBar value={64} />
		),
		{
			inline: true,
			source: false,
			propTables: false
		}
	);
