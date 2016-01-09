import React from 'react';
import {StatefulRangeSlider} from 'rea11y-sliders';



/**
 *
 */
export default function RangeSlidersDemo() {
	return (
		<article className="pattern">
			<header>
				<h2 className="pattern-name">Range slider</h2>
			</header>

			<p>
				The range slider provides the same interactions
				as a basic slider.
			</p>

			<div className="pattern-example">
				<StatefulRangeSlider
					min={0}
					max={100}
					defaultLowerValue={16}
					defaultUpperValue={64}
				/>
			</div>
		</article>
	);
}
