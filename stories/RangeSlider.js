import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {debounce} from 'lodash';
import {StatefulRangeSlider} from '../src';



/**
 *
 */
const handleChange = debounce(action('onChange'), 100);

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
				onChange={handleChange}
			/>
		),
		{
			inline: true,
			source: false,
			propTables: false
		}
	);
