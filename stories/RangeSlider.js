import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {StatefulRangeSlider} from '../src';



/**
 *
 */
storiesOf('RangeSlider', module)
	.addWithInfo(
		'horizontal',
		`
Provides the same keyboard interactions as a basic slider,
but for each handle.
		`,
		() => (
			<StatefulRangeSlider
				defaultLowerValue={16}
				defaultUpperValue={64}
				onChange={action('onChange')}
			/>
		),
		{
			inline: true,
			source: false,
			propTables: false
		}
	);
